const postValidate = (req, res, next) => {
  const { name, description, platforms, released_at, image, genres, rating } =
    req.body;
  if (!name) return res.status(400).json({ error: "Missing name!" });
  if (!description)
    return res.status(400).json({ error: "Missing description!" });
  if (!platforms) return res.status(400).json({ error: "Missing platforms!" });
  if (!released_at)
    return res.status(400).json({ error: "Missing released_at!" });
  if (!rating) return res.status(400).json({ error: "Missing rating!" });
  if (!image) return res.status(400).json({ error: "Missing image!" });
  if (!genres) return res.status(400).json({ error: "Missing genres!" });

  next();
};

module.exports = { postValidate };
