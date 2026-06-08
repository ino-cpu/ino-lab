export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ error: 'Parameter "q" (prompt) diperlukan' });
  }

  try {
    // Simulasi AI (bisa diganti dengan OpenAI atau Hugging Face)
    const response = {
      status: 'success',
      prompt: q,
      result: `🤖 Blackbox AI: "${q}"\n\nIni adalah contoh respons dari serverless function Vercel. Untuk integrasi penuh, ganti dengan API AI nyata seperti OpenAI atau Hugging Face.`,
      timestamp: new Date().toISOString()
    };
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
