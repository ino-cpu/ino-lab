export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { url, emojis, apikey } = req.query;
  if (!url || !emojis || !apikey) {
    return res.status(400).json({ error: 'Parameter url, emojis, dan apikey diperlukan' });
  }

  const target = `https://api-nanzz.my.id/docs/api/tools/react-ch-free.php?url=${encodeURIComponent(url)}&emojis=${encodeURIComponent(emojis)}&apikey=${apikey}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    const response = await fetch(target, { signal: controller.signal });
    clearTimeout(timeoutId);

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Reaction error:', error);
    res.status(502).json({ error: 'Gagal mengirim reaksi', details: error.message });
  }
}
