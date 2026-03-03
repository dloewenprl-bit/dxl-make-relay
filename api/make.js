export default async function handler(req, res) {

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const MAKE_URL = "https://hook.us2.make.com/myyuhnh4x22eocb1au3i695wubdj1062w";

  try {
    const makeResponse = await fetch(MAKE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body || {})
    });

    const text = await makeResponse.text();

    res.status(makeResponse.status);
    res.send(text);

  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}
