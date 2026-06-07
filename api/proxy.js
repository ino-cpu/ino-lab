export default async function handler(req, res) {
  // Izinkan semua origin (CORS)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: 'Missing url parameter' });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      signal: controller.signal
    });

    clearTimeout(timeout);

    // Baca response sebagai text dulu, lalu parse JSON
    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      console.error('Response bukan JSON:', text.substring(0, 200));
      return res.status(502).json({ error: 'API mengembalikan format tidak valid', raw: text.substring(0, 100) });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Proxy error:', error.message);
    res.status(502).json({ error: 'Gagal mengambil data', message: error.message });
  }
}
