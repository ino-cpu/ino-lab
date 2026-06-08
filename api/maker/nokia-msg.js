export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { sender, pesan } = req.query;
  if (!sender || !pesan) {
    return res.status(400).json({ error: 'Parameter "sender" dan "pesan" diperlukan' });
  }

  const nokiaChat = `[NOKIA 3310]\n${sender}: ${pesan}\n--- ${new Date().toLocaleTimeString()} ---`;

  return res.status(200).json({
    status: 'success',
    sender: sender,
    message: pesan,
    chat: nokiaChat,
    timestamp: new Date().toISOString()
  });
}
