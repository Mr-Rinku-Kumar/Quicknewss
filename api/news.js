export default async function handler(req, res) {
  const { category = "general", page = 1 } = req.query;

  const url = `https://gnews.io/api/v4/top-headlines?country=us&category=${category}&apikey=${process.env.GNEWS_API_KEY}&max=10&page=${page}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
}