const { getAllGenres } = require("../controllers/getAllGeneresController");

const getGenresHandler = async (req, res) => {
  try {
    const generesTotal = await getAllGenres();
    res.status(200).json(generesTotal);
  } catch {
    res
      .status(400)
      .send({ error: "Error getGenresHandler", message: error.message });
  }
};

module.exports = {
  getGenresHandler,
};
