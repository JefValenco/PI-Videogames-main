const axios = require("axios");
const { Videogame, Genre } = require("../db");
const { YOUR_API_KEY } = process.env;
const url = require("../dataGames");

const cleanArray = (arr) =>
  arr.map((element) => {
    return {
      id: element.id,
      name: element.name,
      description: element.tags.map((t) => t.name),
      platforms: element.platforms
        .map((platform) => platform.platform.name)
        .join(", "),
      released: element.released,
      rating: element.rating,
      genres: element.genres.map((g) => g.name).join(", "),
      image: element.background_image,
      create: false,
    };
  });

/* 
*pagination*
const getAllVideogames = async (page, limit) => { */
const getAllVideogames = async () => {
  /*   const dataBaseVideogames = await Videogame.findAll({ include: Genre });

  const formattedVideogames = dataBaseVideogames.map((video) => {
 */

  const dataDB = await Videogame.findAll({ include: Genre });
  console.log(dataDB);
  const dataBaseVideogames = dataDB?.map((element) => {
    const genres = element.dataValues.genres
      .map((genre) => genre.name)
      .join(", ");

    return {
      id: element.dataValues.id,
      name: element.dataValues.name,
      description: element.dataValues.description,
      platforms: element.dataValues.platforms,
      released_at: element.dataValues.released_at,
      rating: element.dataValues.rating,
      image: element.dataValues.image,

      genres,
      create: true,
    };
  });

  /*
   * Using Api: *
   */

  /*  const apiVideogame = (
    await axios.get(
      `https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page_size=100
      `
    )
  ).data.results; */

  /* --------------------------- */
  /*
   * Using Stored data from Api: *
   */

  /* --------------------------- */

  const apiVideogame = url;

  /* 
  *pagination*
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const apiVideogames = cleanArray(apiVideogame);
  const dataAndApi = [...dataBaseVideogames, ...apiVideogames];
  const videogamePage = dataAndApi.slice(startIndex, endIndex);

  return videogamePage; */

  const apiVideogames = cleanArray(apiVideogame);

  return [...dataBaseVideogames, ...apiVideogames];
};

const getAllVideogamesByGame = async (game) => {
  try {
    const dataBaseVideogames = await Videogame.findAll({
      where: { name: game },
    });

    /* --------------------------- */

    /*
     * Using Api: *
     */

    /* const apiVideogame = (
      await axios.get(
        `https://api.rawg.io/api/games?search=${game}&key=${YOUR_API_KEY}   
      `
      )
    ).data.results; */

    /* --------------------------- */
    /* --------------------------- */

    /*
     * Using Stored data from Api: *
     */
    const apiVideogame = url;
    /* --------------------------- */

    const apiVideogames = cleanArray(apiVideogame);

    const filterVideogame = apiVideogames.filter((element) =>
      element.name.toLowerCase().includes(game.toLowerCase())
    );

    return [...filterVideogame, ...dataBaseVideogames];
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get videogames by name from API");
  }
};

const getAllVideogamesById = async (id, source) => {
  let videogame;

  if (source === "api") {
    const apiVideogame = await getAllVideogames();

    videogame = await apiVideogame.find((elemen) => elemen.id == Number(id));
  } else {
    videogame = await Videogame.findByPk(id, { include: Genre });
  }

  return videogame;
};

const updateVideogame = async (
  id,
  name,
  description,
  platforms,
  released_at,
  rating,
  image,
  genres
) => {
  const videogame = await getAllVideogamesById(id);

  if (!videogame) return videogame;

  videogame.name = name || videogame.name;
  videogame.description = description || videogame.description;
  videogame.platforms = platforms || videogame.platforms;
  videogame.released_at = released_at || videogame.released_at;
  videogame.rating = rating || videogame.rating;
  videogame.image = image || videogame.image;
  videogame.genres = genres || videogame.genres;

  if (genres) {
    const existingGenres = await videogame.getGenres();

    await videogame.removeGenres(existingGenres);

    const allGenres = await Genre.findAll({
      where: { name: genres },
    });

    await videogame.addGenres(allGenres);
  }
  await videogame.save(); // save the changes to the database

  return videogame;
};

module.exports = {
  getAllVideogames,
  getAllVideogamesByGame,
  getAllVideogamesById,
  updateVideogame,
};
