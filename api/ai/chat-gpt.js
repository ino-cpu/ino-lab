export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { text, model = 'chatgpt' } = req.query;
  if (!text) {
    return res.status(400).json({ error: 'Parameter "text" diperlukan' });
  }

  try {
    // Simulasi ChatGPT (ganti dengan OpenAI API jika punya API key)
    const response = {
      status: 'success',
      model: model,
      input: text,
      response: `💬 ChatGPT (${model}): "${text}"\n\nIni adalah contoh respons dari serverless function. Hubungkan dengan OpenAI API untuk hasil real.`,
      timestamp: new Date().toISOString()
    };
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
