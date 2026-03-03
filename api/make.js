module.exports = async (req, res) => {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const MAKE_URL = "https://hook.us2.make.com/myyuhnh4x22eocb1au3i695wubdj1062w";

  try {
    // IMPORTANT: req.body might be undefined unless Vercel parses it
    // So we safely handle string body too.
    const body =
      typeof req.body === "string" ? JSON.parse(req.body) :
      (req.body ?? {});

    const makeRes = await fetch(MAKE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const text = await makeRes.text();
    return res.status(makeRes.status).send(text);
  } catch (err) {
    return res.status(500).json({ ok: false, error: String(err) });
  }
};
