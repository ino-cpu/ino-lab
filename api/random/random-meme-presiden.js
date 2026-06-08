export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();

  // Data meme presiden (contoh)
  const memes = [
    { url: 'https://i.imgflip.com/8l0w4n.jpg', title: 'Jokowi Angkat Tangan' },
    { url: 'https://i.imgflip.com/5i7o3y.jpg', title: 'Prabowo Gemoy' },
    { url: 'https://i.imgflip.com/7k4m2n.jpg', title: 'Megawati Senyum' }
  ];
  const randomMeme = memes[Math.floor(Math.random() * memes.length)];

  return res.status(200).json(randomMeme);
}
