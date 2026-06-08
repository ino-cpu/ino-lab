export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const memeIndo = [
    { url: 'https://i.imgflip.com/2kbnqp.jpg', title: 'Meme Kocak', caption: 'Warga +62 lagi viral' },
    { url: 'https://i.imgflip.com/3l45k1.jpg', title: 'Siapa Takut', caption: 'Santuy jiwa' },
    { url: 'https://i.imgflip.com/4m67n2.jpg', title: 'Tetap Semangat', caption: 'Meskipun galau' },
    { url: 'https://i.imgflip.com/5n78o3.jpg', title: 'Kuli Bangunan', caption: 'Otot kuat' },
    { url: 'https://i.imgflip.com/6o89p4.jpg', title: 'Anak Muda Zaman Now', caption: 'Mageran tapi kreatif' }
  ];
  const random = memeIndo[Math.floor(Math.random() * memeIndo.length)];
  return res.status(200).json(random);
}
