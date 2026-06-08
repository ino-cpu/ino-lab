import formidable from 'formidable';
import fs from 'fs';

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

    // Simulasi konversi gambar ke prompt
    const mockPrompt = `An image uploaded at ${new Date().toISOString()} - AI would analyze this and generate a prompt.`;

    return res.status(200).json({
      status: 'success',
      prompt: mockPrompt,
      filename: imageFile.originalFilename,
      size: imageFile.size
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
