const {
  getAllVideogames,
  getAllVideogamesByGame,
  getAllVideogamesById,
  updateVideogame,
} = require("../controllers/videogameControllers");
const { createVideogame } = require("../controllers/createVideogameController");
const { Videogame } = require("../db");

/* 
*pagiantion*
const getVideogameHandler = async (req, res) => {
  const { game, page, limit } = req.query;
  try {
    const results = game
      ? await getAllVideogamesByGame(game)
      : await getAllVideogames(page, limit);

    if (results.length === 0) {
      throw new Error("No videogames found");
    }
    res.status(200).json(results);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error getVideogameHandler", message: error.message });
  }
}; */
const getVideogameHandler = async (req, res) => {
  const { game } = req.query;
  try {
    const results = game
      ? await getAllVideogamesByGame(game)
      : await getAllVideogames();

    if (results.length === 0) {
      throw new Error("No videogames found");
    }
    res.status(200).json(results);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error getVideogameHandler", message: error.message });
  }
};

const getVideogameHandlerId = async (req, res) => {
  const { id } = req.params;
  const source = isNaN(id) ? "db" : "api";
  try {
    const videogame = await getAllVideogamesById(id, source);
    res.status(201).json(videogame);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error getVideogameHandlerId", message: error.message });
  }
};

const postVideogameHandler = async (req, res) => {
  try {
    const newVideogame = await createVideogame(req.body);
    res.status(201).json(newVideogame);
  } catch (error) {
    console.log(req.body);
    res
      .status(400)
      .json({ error: "Error postVideogameHandler", message: error.message });
  }
};

const EndVideogameHandler = async (req, res) => {
  const { name } = req.query;

  try {
    const videogameToDelete = await Videogame.findOne({
      where: {
        name: name,
      },
    });

    if (!videogameToDelete) {
      throw new Error("Videogame not found");
    }

    await videogameToDelete.destroy();

    res.status(200).json({ message: "Videogame deleted successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error deleting videogame", message: error.message });
  }
};

const UpdateVideogameHandler = async (req, res) => {
  try {
    const {
      id,
      name,
      description,
      platforms,
      released_at,
      rating,
      image,
      genres,
    } = req.body;

    if (!id) throw Error("Id must be provided");

    const videogame = updateVideogame(
      id,
      name,
      description,
      platforms,
      released_at,
      rating,
      image,
      genres
    );

    if (videogame.error) throw Error(videogame.error);

    return res.status(200).json({ message: "Videogame updated successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error updating Videogame", message: error.message });
  }
};

module.exports = {
  getVideogameHandler,
  getVideogameHandlerId,
  postVideogameHandler,
  EndVideogameHandler,
  UpdateVideogameHandler,
};
