// Vercel serverless function — proxy football-data.org (évite CORS navigateur)
export default async function handler(req, res) {
  const FD_KEY = "d0e59dca14bf46448e54da7177b5d98c";
  const FD_BASE = "https://api.football-data.org/v4";

  const { matchday, season, dateFrom, dateTo } = req.query;

  let url = `${FD_BASE}/competitions/FL1/matches?`;
  if (season)   url += `season=${season}&`;
  if (matchday) url += `matchday=${matchday}&`;
  if (dateFrom) url += `dateFrom=${dateFrom}&`;
  if (dateTo)   url += `dateTo=${dateTo}&`;

  try {
    const upstream = await fetch(url, {
      headers: { "X-Auth-Token": FD_KEY },
    });
    const data = await upstream.json();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "s-maxage=120, stale-while-revalidate=60");
    res.status(upstream.status).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
