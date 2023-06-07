const { Router } = require("express");
const {
  getVideogameHandler,
  getVideogameHandlerId,
  postVideogameHandler,
  EndVideogameHandler,
  UpdateVideogameHandler,
} = require("../handlers/videogameHandler");
const { postValidate } = require("../middlewares/postValidate");

const videogameRouter = Router();

videogameRouter
  .route("/")
  .get(getVideogameHandler)
  .post(postValidate, postVideogameHandler)
  .delete(EndVideogameHandler)
  .put(UpdateVideogameHandler);

videogameRouter.get("/:id", getVideogameHandlerId);

module.exports = videogameRouter;
