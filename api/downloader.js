export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'Missing url' });
  const target = `https://api-nanzz.my.id/docs/api/donwloader/all-in-one.php?url=${encodeURIComponent(url)}`;
  try {
    const resp = await fetch(target);
    const data = await resp.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
