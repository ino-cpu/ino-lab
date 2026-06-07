export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { image, filename } = req.body;
  if (!image) {
    return res.status(400).json({ error: 'No image data' });
  }

  // Konversi base64 ke buffer
  const buffer = Buffer.from(image, 'base64');

  // Siapkan FormData untuk dikirim ke API eksternal
  const formData = new FormData();
  const blob = new Blob([buffer], { type: 'image/jpeg' });
  formData.append('file', blob, filename || 'image.jpg');

  try {
    const response = await fetch('https://api-nanzz.my.id/docs/api/tools/image/upscale.php', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error('Upscaler error:', err);
    res.status(500).json({ error: err.message });
  }
}
