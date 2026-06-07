export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: 'Parameter url diperlukan' });
  }

  const target = `https://api-nanzz.my.id/docs/api/donwloader/all-in-one.php?url=${encodeURIComponent(url)}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000);

    const response = await fetch(target, { signal: controller.signal });
    clearTimeout(timeoutId);

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Downloader error:', error);
    res.status(502).json({ error: 'Gagal mengambil data media', details: error.message });
  }
}
