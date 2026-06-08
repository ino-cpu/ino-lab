export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { username } = req.query;
  if (!username) {
    return res.status(400).json({ error: 'Parameter "username" diperlukan' });
  }

  const goldText = `✨ GOLDEN LOBBY ✨\nPlayer: ${username}\nRank: Grandmaster\nEffect: Gold Text Active`;

  return res.status(200).json({
    status: 'success',
    username: username,
    gold_text: goldText,
    message: 'Berhasil generate teks gold FF'
  });
}
