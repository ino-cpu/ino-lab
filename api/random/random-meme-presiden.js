export default function handler(req, res) {
  // Set CORS headers agar frontend bisa akses
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const memes = [
    { url: 'https://i.imgflip.com/8l0w4n.jpg', title: 'Jokowi Angkat Tangan', caption: 'Pak Jokowi lagi semangat!' },
    { url: 'https://i.imgflip.com/5i7o3y.jpg', title: 'Prabowo Gemoy', caption: 'Gemoy abis!' },
    { url: 'https://i.imgflip.com/7k4m2n.jpg', title: 'Megawati Senyum', caption: 'Senyum khas ibu bangsa' }
  ];
  const random = memes[Math.floor(Math.random() * memes.length)];
  res.status(200).json(random);
}
