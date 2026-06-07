export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method tidak diizinkan' });
  }

  const { file } = req.body;
  if (!file) {
    return res.status(400).json({ error: 'File gambar diperlukan' });
  }

  const formData = new FormData();
  formData.append('file', file);

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000);

    const response = await fetch('https://api-nanzz.my.id/docs/api/tools/image/upscale.php', {
      method: 'POST',
      body: formData,
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Upscaler error:', error);
    res.status(502).json({ error: 'Gagal memproses gambar', details: error.message });
  }
}
