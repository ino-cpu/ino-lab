export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { url, emojis, apikey } = req.query;
  if (!url || !emojis) {
    return res.status(400).json({ error: 'Parameter "url" dan "emojis" diperlukan' });
  }

  // Validasi apikey (contoh sederhana)
  const validApiKey = process.env.REACTOR_API_KEY || 'nanasfree';
  if (apikey !== validApiKey) {
    return res.status(401).json({ error: 'Apikey tidak valid' });
  }

  return res.status(200).json({
    status: 'success',
    channel_url: url,
    reactions: emojis.split(','),
    message: `Berhasil mengirim reaksi ${emojis} ke channel WhatsApp (simulasi)`,
    timestamp: new Date().toISOString()
  });
}
