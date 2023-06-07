const axios = require("axios");
const { Videogame, Genre } = require("../db");

const createVideogame = async (body) => {
  const { name, description, platforms, released_at, image, genres, rating } =
    body;
  const newVideogame = await Videogame.create({
    name: name,
    description: description,
    platforms: platforms,
    released_at: released_at,
    image: image,
    rating: rating,
  });

  const videoNames = Array.isArray(genres)
    ? genres
    : genres.split(",").map((genre) => genre.trim());
  const allGenres = await Genre.findAll({ where: { name: videoNames } });
  await newVideogame.addGenre(allGenres);

  return newVideogame;
};

module.exports = {
  createVideogame,
};
