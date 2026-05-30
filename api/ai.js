// api/ai.js — Vercel Serverless Function
// Ta clé Groq est stockée dans les variables d'environnement Vercel (jamais visible par les utilisateurs)

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const GROQ_KEY = process.env.GROQ_API_KEY;
  if (!GROQ_KEY) return res.status(500).json({ error: 'Clé API non configurée sur le serveur.' });

  const { prompt, model, image, system, messages } = req.body;
  const SYS_JSON = "Tu es StudyAI, assistant scolaire pour lycéens québécois. Réponds UNIQUEMENT avec du JSON valide, sans texte avant ni après, sans balises markdown.";

  try {
    let groqMessages;
    let groqModel;

    if (model === 'vision' && image) {
      // Vision model — analyse d'image
      groqModel = 'meta-llama/llama-4-scout-17b-16e-instruct';
      groqMessages = [
        { role: 'system', content: system || SYS_JSON },
        {
          role: 'user',
          content: [
            { type: 'image_url', image_url: { url: `data:${image.mime};base64,${image.data}` } },
            { type: 'text', text: prompt }
          ]
        }
      ];
    } else if (model === 'chat' && messages) {
      // Chat multi-tour — Prof IA
      groqModel = 'llama-3.3-70b-versatile';
      groqMessages = [
        { role: 'system', content: system || SYS_JSON },
        ...messages
      ];
    } else {
      // Texte standard — Quiz, Flashcards, Résumé, Plan, Exam
      groqModel = 'llama-3.3-70b-versatile';
      groqMessages = [
        { role: 'system', content: SYS_JSON },
        { role: 'user', content: prompt }
      ];
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_KEY}`
      },
      body: JSON.stringify({
        model: groqModel,
        max_tokens: model === 'chat' ? 600 : 1800,
        messages: groqMessages
      })
    });

    const data = await response.json();
    if (data.error) return res.status(400).json({ error: data.error.message || 'Erreur Groq' });

    return res.status(200).json({ result: data.choices[0].message.content });

  } catch (err) {
    return res.status(500).json({ error: err.message || 'Erreur serveur' });
  }
}
