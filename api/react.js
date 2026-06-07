export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();
  const { url, emojis, apikey } = req.query;
  if (!url || !emojis || !apikey) return res.status(400).json({ error: 'Missing params' });
  const target = `https://api-nanzz.my.id/docs/api/tools/react-ch-free.php?url=${encodeURIComponent(url)}&emojis=${encodeURIComponent(emojis)}&apikey=${apikey}`;
  try {
    const resp = await fetch(target);
    const data = await resp.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
