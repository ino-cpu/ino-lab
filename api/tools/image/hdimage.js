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
    const quality = fields.quality?.[0] || '4k';

    if (!imageFile) {
      return res.status(400).json({ error: 'File gambar tidak ditemukan' });
    }

    let scaleFactor = 4;
    if (quality === '6K') scaleFactor = 6;
    if (quality === '8K') scaleFactor = 8;

    const image = sharp(imageFile.filepath);
    const metadata = await image.metadata();
    const upscaledBuffer = await image
      .resize(metadata.width * scaleFactor, metadata.height * scaleFactor)
      .toBuffer();

    const base64Image = upscaledBuffer.toString('base64');
    const mimeType = `image/${metadata.format}`;

    return res.status(200).json({
      status: 'success',
      upscaled_image: `data:${mimeType};base64,${base64Image}`,
      original_size: `${metadata.width}x${metadata.height}`,
      new_size: `${metadata.width * scaleFactor}x${metadata.height * scaleFactor}`,
      quality: quality,
      message: `Berhasil di-upscale ke ${quality} menggunakan sharp`
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
