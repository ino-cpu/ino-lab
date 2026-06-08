export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const wallpapers = [
    { url: 'https://wallpaperaccess.com/full/1385382.jpg', resolution: '1920x1080', category: 'Cyber' },
    { url: 'https://wallpaperaccess.com/full/1385383.jpg', resolution: '1920x1080', category: 'Space' },
    { url: 'https://wallpaperaccess.com/full/1385384.jpg', resolution: '2560x1440', category: 'Nature' },
    { url: 'https://wallpaperaccess.com/full/1385385.jpg', resolution: '1920x1080', category: 'Abstract' },
    { url: 'https://wallpaperaccess.com/full/1385386.jpg', resolution: '3840x2160', category: 'Cyberpunk' }
  ];
  const random = wallpapers[Math.floor(Math.random() * wallpapers.length)];
  return res.status(200).json(random);
}
