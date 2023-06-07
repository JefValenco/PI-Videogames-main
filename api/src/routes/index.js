const { Router } = require("express");

const videogameRouter = require("./videogameRouter");
const genreRouter = require("./genreRouter");

const router = Router();

router.use("/videogame", videogameRouter);
router.use("/genre", genreRouter);
module.exports = router;
