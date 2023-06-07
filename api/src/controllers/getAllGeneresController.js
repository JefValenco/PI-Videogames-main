const axios = require("axios");
const { Genre } = require("../db");
const { YOUR_API_KEY } = process.env;
const url2 = require("../dataGeneres");

const getAllGenres = async () => {
  /* --------------------------- */

  /*
   * Using Api: *
   */

  /*  const apiGenres = (
    await axios.get(`https://api.rawg.io/api/genres?key=${YOUR_API_KEY}
    `)
  ).data.results.map((element) => {
    return { name: element.name };
  });
  console.log(apiGenres); */

  /* --------------------------- */
  /* 
 


  /*
   * Using Stored data from Api: *
   */
  const apiGenres = url2;
  /* --------------------------- */

  const promises = apiGenres.map(async (element) => {
    const [genres, created] = await Genre.findOrCreate({
      where: {
        name: element.name,
      },
    });
    return genres;
  });

  const genres = await Promise.all(promises);
  return genres;
};
module.exports = {
  getAllGenres,
};
