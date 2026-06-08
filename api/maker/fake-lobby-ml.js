export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { username, rank, border } = req.query;
  if (!username) {
    return res.status(400).json({ error: 'Parameter "username" diperlukan' });
  }

  const rankCard = `🏆 MLBB FAKE RANK 🏆\nUsername: ${username}\nRank: ${rank || 'Mythic Glory'}\nBorder Level: ${border || '1'}\n✨ Premium Style ✨`;

  return res.status(200).json({
    status: 'success',
    username: username,
    rank: rank || 'Mythic Glory',
    border: border || '1',
    rank_card: rankCard,
    message: 'Berhasil generate rank card MLBB'
  });
}
