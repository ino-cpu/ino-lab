export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: 'Parameter "url" diperlukan' });
  }

  // Deteksi platform (sederhana)
  let platform = 'unknown';
  if (url.includes('instagram.com')) platform = 'Instagram';
  else if (url.includes('tiktok.com')) platform = 'TikTok';
  else if (url.includes('youtube.com') || url.includes('youtu.be')) platform = 'YouTube';

  return res.status(200).json({
    status: 'success',
    platform: platform,
    original_url: url,
    message: `Link download untuk ${platform} akan segera tersedia. Integrasikan dengan API downloader nyata seperti yt-dlp atau instagram-scraper.`,
    download_url: `#demo-${platform.toLowerCase()}-downloader`
  });
}
