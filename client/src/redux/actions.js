import axios from "axios";

export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_GENRE = "GET_GENRE";
export const GET_DELETE_VIDEOGAMES = "GET_DELETE_VIDEOGAMES";
export const GET_MODIFY_VIDEOGAMES = "GET_MODIFY_VIDEOGAMES";
export const GET_ITEM_BY_ID = "GET_ITEM_BY_ID";
export const GET_ITEM_BY_NAME = "GET_ITEM_BY_NAME";
export const ORDER_BY_AZ = "ORDER_BY_AZ";
export const ORDER_BY_RATING = "ORDER_BY_RATING";
export const CLEAR_SEARCH = "CLEAR_SEARCH";
export const FILTER_BY_GENRE = "FILTER_BY_GENRE";
export const FILTER_BY_CREATED = "FILTER_BY_CREATED";

export function getVideogames() {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3005/videogame`);
      console.log("Response data:", response.data);
      dispatch({ type: GET_VIDEOGAMES, payload: response.data });
    } catch (error) {
      console.log("Get getVideogames Actions Error:", error);
    }
  };
}

export function getGenre() {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3005/genre`);
      console.log("Response data:", response.data);
      dispatch({ type: GET_GENRE, payload: response.data });
    } catch (error) {
      console.log("Get getGenre Actions Error:", error);
    }
  };
}

export function getDeleteVideogames() {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3005/videogame`);
      const createdVideogames = response.data.filter(
        (videogame) => videogame.create
      );
      dispatch({ type: GET_DELETE_VIDEOGAMES, payload: createdVideogames });
    } catch (error) {
      console.log("Get getDeleteVideogames Actions Error:", error);
    }
  };
}

export function getModifyVideogames() {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3005/videogame`);
      const createdVideogames = response.data.filter(
        (videogame) => videogame.create
      );
      dispatch({ type: GET_MODIFY_VIDEOGAMES, payload: createdVideogames });
    } catch (error) {
      console.log("Get getModifyVideogames Actions Error:", error);
    }
  };
}

export function getItemById(id) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3005/videogame/${id}`);
      dispatch({ type: GET_ITEM_BY_ID, payload: response.data });
    } catch (error) {
      dispatch({ type: GET_ITEM_BY_ID, payload: null });
    }
  };
}

export function getItemByName(payload) {
  return async function (dispatch) {
    try {
      let response = await axios.get(
        `http://localhost:3005/videogame?game=` + payload
      );
      return dispatch({
        type: GET_ITEM_BY_NAME,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
      return dispatch({
        type: GET_ITEM_BY_NAME,
        payload: "not found",
      });
    }
  };
}

export function FilterByGenre(payload) {
  return {
    type: "FILTER_BY_GENRE",
    payload,
  };
}

export function FilterByCreated(payload) {
  if (payload === "All") {
    return {
      type: "FILTER_BY_CREATED",
      payload: payload,
    };
  } else {
    return {
      type: "FILTER_BY_CREATED",
      payload: payload === "true",
    };
  }
}

export function orderByAZ(payload) {
  return {
    type: "ORDER_BY_AZ",
    payload,
  };
}

export function orderByRating(payload) {
  return {
    type: "ORDER_BY_RATING",
    payload,
  };
}

export function clearSearch() {
  return { type: CLEAR_SEARCH };
}
