import {
  GET_VIDEOGAMES,
  GET_GENRE,
  GET_DELETE_VIDEOGAMES,
  GET_MODIFY_VIDEOGAMES,
  GET_ITEM_BY_ID,
  GET_ITEM_BY_NAME,
  ORDER_BY_AZ,
  ORDER_BY_RATING,
  CLEAR_SEARCH,
  FILTER_BY_GENRE,
  FILTER_BY_CREATED,
} from "./actions";

const initialState = {
  videogames: [],
  allVideogames: [],
  genres: [],
  deleteItem: [],
  modifyItem: [],
  itemById: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
        allVideogames: action.payload,
      };
    case GET_GENRE:
      return {
        ...state,
        genres: action.payload,
      };
    case GET_DELETE_VIDEOGAMES:
      return {
        ...state,
        deleteItem: action.payload,
      };
    case GET_MODIFY_VIDEOGAMES:
      return {
        ...state,
        modifyItem: action.payload,
      };

    case GET_ITEM_BY_ID:
      return {
        ...state,
        itemById: action.payload,
      };

    case GET_ITEM_BY_NAME:
      let search;
      if (Array.isArray(action.payload) && action.payload.length > 0) {
        search = action.payload;
      } else {
        search = [];
      }
      return {
        ...state,
        videogames: search,
      };

    case FILTER_BY_GENRE:
      const allGenres = state.allVideogames;
      const filteredGenres =
        action.payload === "All"
          ? allGenres
          : allGenres.filter(
              (el) => el.genres && el.genres.includes(action.payload)
            );
      return {
        ...state,
        videogames: filteredGenres,
      };

    case FILTER_BY_CREATED:
      const allCreated = state.allVideogames;
      const filteredCreated =
        action.payload === "All"
          ? allCreated
          : allCreated.filter((el) => el.create === action.payload);
      return {
        ...state,
        videogames: filteredCreated,
      };

    case ORDER_BY_AZ:
      const allAlphabet = state.allVideogames;
      let sortedArr;
      if (action.payload === "des") {
        sortedArr = state.videogames.slice().sort(function (a, b) {
          return a.name.localeCompare(b.name);
        });
      } else if (action.payload === "asc") {
        sortedArr = state.videogames.slice().sort(function (a, b) {
          return b.name.localeCompare(a.name);
        });
      } else if (action.payload === "clear") {
        sortedArr = allAlphabet;
      }

      return { ...state, videogames: sortedArr };

    case ORDER_BY_RATING:
      const allItems = state.allVideogames;
      let sortedItems;
      if (action.payload === "asc") {
        sortedItems = state.videogames.slice().sort(function (a, b) {
          return b.rating - a.rating;
        });
      } else if (action.payload === "des") {
        sortedItems = state.videogames.slice().sort(function (a, b) {
          return a.rating - b.rating;
        });
      } else if (action.payload === "clear") {
        sortedItems = allItems;
      }

      return { ...state, videogames: sortedItems };

    case CLEAR_SEARCH:
      return {
        ...state,
        allVideogames: state.initialCountries,
      };

    default:
      return state;
  }
};

export default rootReducer;
