export default function handler(req, res) {
  const { name = "Dunia" } = req.query;
  res.status(200).json({ message: `Halo ${name} dari Serverless Function Vercel!` });
}
