export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const papList = [
    { url: 'https://randomuser.me/api/portraits/women/1.jpg', gender: 'female', age: 22 },
    { url: 'https://randomuser.me/api/portraits/men/2.jpg', gender: 'male', age: 25 },
    { url: 'https://randomuser.me/api/portraits/women/3.jpg', gender: 'female', age: 20 },
    { url: 'https://randomuser.me/api/portraits/men/4.jpg', gender: 'male', age: 28 },
    { url: 'https://randomuser.me/api/portraits/women/5.jpg', gender: 'female', age: 24 },
    { url: 'https://randomuser.me/api/portraits/men/6.jpg', gender: 'male', age: 26 }
  ];
  const random = papList[Math.floor(Math.random() * papList.length)];
  return res.status(200).json(random);
}
