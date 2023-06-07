const { Router } = require("express");
const { getGenresHandler } = require("../handlers/genreHandler");

const genreRouter = Router();

genreRouter.get("/", getGenresHandler);

module.exports = genreRouter;
