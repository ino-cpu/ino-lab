import formidable from 'formidable';
import sharp from 'sharp';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const form = formidable({});
    const [fields, files] = await form.parse(req);
    const imageFile = files.file?.[0];

    if (!imageFile) {
      return res.status(400).json({ error: 'File gambar tidak ditemukan' });
    }

    // Upscale menggunakan sharp (4x)
    const image = sharp(imageFile.filepath);
    const metadata = await image.metadata();
    const upscaledBuffer = await image
      .resize(metadata.width * 4, metadata.height * 4)
      .toBuffer();

    const base64Image = upscaledBuffer.toString('base64');
    const mimeType = `image/${metadata.format}`;

    return res.status(200).json({
      status: 'success',
      upscaled_image: `data:${mimeType};base64,${base64Image}`,
      original_size: `${metadata.width}x${metadata.height}`,
      new_size: `${metadata.width * 4}x${metadata.height * 4}`,
      message: 'Berhasil di-upscale ke 4K (simulasi dengan sharp)'
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
