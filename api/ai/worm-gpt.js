export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { prompt } = req.query;
  if (!prompt) {
    return res.status(400).json({ error: 'Parameter "prompt" diperlukan' });
  }

  try {
    const response = {
      status: 'success',
      prompt: prompt,
      result: `🐛 WormGPT: "${prompt}"\n\nContoh respons dari serverless function. Ganti dengan API AI khusus jika diperlukan.`,
      timestamp: new Date().toISOString()
    };
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
