import { useState } from "react";
import styles from "../../views/Modify/Modify.module.css";
import axios from "axios";
import { getGenre } from "../../redux/actions";
import { getModifyVideogames } from "../../redux/actions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { validate } from "../../middleware/validate";
/* import SearchBar from "../../components/SearchBar/SearchBar"; */

const Modify = () => {
  const dispatch = useDispatch();

  //----------States----------//

  const [formModify, setFormModify] = useState({
    id: "",
    name: "",
    description: "",
    platforms: "",
    released_at: "",
    rating: "",
    image: "",
    genres: [],
  });

  //----------Reset States----------//

  const resetFormModify = () => {
    setFormModify({
      id: "",
      name: "",
      description: "",
      platforms: "",
      released_at: "",
      rating: "",
      image: "",
      genres: [],
    });
  };

  //----------Change Handlers----------//

  const changeHandlerModify = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    if (property === "name") {
      const selectedVideogame = videogames.find(
        (videogame) => videogame.name === value
      );
      setFormModify({
        ...formModify,
        [property]: value,
        id: selectedVideogame?.id || "",
      });
    } else {
      setFormModify({ ...formModify, [property]: value });
    }
  };

  const changeHandlerGenre = (event) => {
    const value = event.target.value;

    if (!formModify.genres.includes(value)) {
      setFormModify({ ...formModify, genres: [...formModify.genres, value] });
    }
  };

  //----------Summit Form Validation ----------//

  const requiredFields = [
    { field: "name", message: "Please enter a name for your Videogame." },
    {
      field: "description",
      message: "Please enter a description for your Videogame.",
    },
    {
      field: "platforms",
      message: "Please enter the platforms for your Videogame.",
    },
    {
      field: "released_at",
      message: "Please enter the release date for your Videogame.",
    },
    {
      field: "rating",
      message: "Please enter the rating year points for your Pokemon.",
    },
    {
      field: "image",
      message: "Please enter the image URL for your Videogame.",
    },
    { field: "genres", message: "Please enter the genres for your Videogame." },
  ];

  //----------Summit Handlers----------//

  const submitHandlerModify = (event) => {
    event.preventDefault();

    // Check if required fields are missing
    for (const { field, message } of requiredFields) {
      if (!formModify[field]) {
        alert(message);
        return;
      }
    }

    // Check if at least one type is selected

    if (formModify.genres.length === 0 || formModify.genres.includes("")) {
      alert("Please select at least one genre for your Videogame.");
      return;
    }

    // Send formModify data to server
    axios
      .put("http://localhost:3005/videogame", formModify)
      .then((res) => {
        alert("Videogame updated!");
        resetFormModify();
        window.location.reload();
      })
      .catch((err) => alert(err));
  };

  //----------Dispatches Handlers----------//

  useEffect(() => {
    dispatch(getGenre());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getModifyVideogames());
  }, [dispatch]);

  //---------- Selectors ----------//

  const videogames = useSelector((state) => state.modifyItem);

  const genress = useSelector((state) => state.genres);

  //----------Complementary fn ----------//

  const removeGenre = (event, index) => {
    event.preventDefault(); // prevent form submission
    const newVideogame = [...formModify.genres];
    newVideogame.splice(index, 1);
    setFormModify({ ...formModify, genres: newVideogame });
  };

  const [id, setId] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [platforms, setPlatforms] = useState([]);
  const [released_at, setReleasedAt] = useState("");
  const [rating, setRating] = useState("");
  const [image, setImage] = useState("");
  const [genres, setGenres] = useState([]);

  //---------- Render  ----------//

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.box}>
          <h1 className={styles.h4}>Select Videogame</h1>
          <div className={styles.container}>
            <div className={styles.box}>
              <label className={styles.label}>Name: </label>
              <select
                className={styles.input}
                placeholder="Choose a videogame to Modify..."
                videogames="text"
                value={formModify.name}
                onChange={(event) => {
                  changeHandlerModify(event);
                  const selectedVideogame = videogames.find(
                    (videogame) => videogame.name === event.target.value
                  );
                  setId(selectedVideogame?.id || "");
                  setName(selectedVideogame?.name || "");
                  setDescription(selectedVideogame?.description || "");
                  setPlatforms(selectedVideogame?.platforms || "");
                  setReleasedAt(selectedVideogame?.released_at || "");
                  setRating(selectedVideogame?.rating || "");
                  setImage(selectedVideogame?.image || "");
                  setGenres(selectedVideogame?.genres || []);
                }}
                name="name"
              >
                <option value="videogames"></option>
                {videogames &&
                  videogames
                    .sort((a, b) => {
                      if (a.name < b.name) return -1;
                      if (a.name > b.name) return 1;
                      return 0;
                    })
                    .map((videogames) => {
                      return (
                        <option value={videogames.name} key={videogames.id}>
                          {videogames.name}
                        </option>
                      );
                    })}
              </select>
              <div>
                {image && <img className={styles.img} src={image} alt={name} />}
              </div>
            </div>
            <div className={styles.box}>
              <div>
                <div className={styles.forml}>
                  <div>
                    <label className={styles.label}>id: </label>
                    <input
                      className={styles.input3}
                      type="text"
                      value={id}
                      name="id"
                      disabled // added disabled attribute
                    />

                    <div>
                      <label className={styles.label}>Info: </label>
                      <input
                        className={styles.input3}
                        type="text"
                        value={description}
                        name="description"
                        disabled // added disabled attribute
                      />
                    </div>

                    <div>
                      <label className={styles.label}>Platforms: </label>
                      <input
                        className={styles.input3}
                        type="text"
                        value={platforms}
                        name="platforms"
                        disabled // added disabled attribute
                      />
                    </div>

                    <div>
                      <label className={styles.label}>Published: </label>
                      <input
                        className={styles.input3}
                        type="text"
                        value={released_at}
                        name="released_at"
                        disabled // added disabled attribute
                      />
                    </div>

                    <div>
                      <label className={styles.label}>Rating: </label>
                      <input
                        className={styles.input3}
                        type="text"
                        value={rating}
                        name="rating"
                        disabled // added disabled attribute
                      />
                    </div>

                    <div>
                      <label className={styles.label}>Genres: </label>
                      <input
                        className={styles.input3}
                        type="text"
                        value={genres}
                        name="genres"
                        disabled // added disabled attribute
                      />
                    </div>

                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.box}>
          <h1 className={styles.h4}>Modify Videogame</h1>
          <form onSubmit={submitHandlerModify}>
            <div>
              <label className={styles.label}>Name: </label>
              <input
                className={styles.input}
                type="text"
                value={formModify.name}
                onChange={changeHandlerModify}
                name="name"
              ></input>
            </div>

            <div>
              <label className={styles.label}>Info:</label>
              <input
                className={styles.input}
                type="text"
                value={formModify.description}
                onChange={changeHandlerModify}
                name="description"
              ></input>
            </div>

            <div>
              <label className={styles.label}>Platforms: </label>
              <select
                className={styles.input}
                value={formModify.Platforms}
                onChange={changeHandlerModify}
                name="platforms"
              >
                <option value="" disabled selected>
                  Choose platforms
                </option>
                <option>Playstation</option>
                <option>Xbox</option>
                <option>Nintendo</option>
              </select>
            </div>

            <div>
              <label className={styles.label}>Published: </label>
              <input
                className={styles.input}
                type="text"
                value={formModify.released_at}
                onChange={changeHandlerModify}
                name="released_at"
              ></input>
            </div>

            <div>
              <label className={styles.label}>Rating: </label>
              <input
                className={styles.input}
                type="text"
                value={formModify.rating}
                onChange={changeHandlerModify}
                name="rating"
              ></input>
            </div>

            <div>
              <label className={styles.label}>Image: </label>
              <select
                className={styles.input}
                value={formModify.image}
                onChange={changeHandlerModify}
                name="image"
              >
                <option value="" disabled>
                  Choose image
                </option>

                <option value="https://media.rawg.io/media/games/960/960b601d9541cec776c5fa42a00bf6c4.jpg">
                  img 1
                </option>
                <option value="https://media.rawg.io/media/games/ee3/ee3e10193aafc3230ba1cae426967d10.jpg">
                  img 2
                </option>
              </select>
              <div>
                {formModify.image && (
                  <img
                    src={formModify.image}
                    alt="Preview"
                    className={styles.img}
                  />
                )}
              </div>
            </div>

            <div>
              <label className={styles.label}>Genre: </label>
              <select
                className={styles.input}
                placeholder="Choose a Genre"
                type="text"
                onChange={changeHandlerGenre}
                name="genre"
                style={{ width: "150px" }}
              >
                <option value="" disabled selected>
                  Choose genre
                </option>
                <option value=""></option>
                {genress &&
                  genress
                    .sort((a, b) => {
                      if (a.name < b.name) return -1;
                      if (a.name > b.name) return 1;
                      return 0;
                    })
                    .map((genre) => {
                      return (
                        <option value={genre.name} key={genre.id}>
                          {genre.name}
                        </option>
                      );
                    })}
              </select>

              <div>
                {formModify.genres.map((genres, index) => (
                  <div key={index}>
                    <span>{genres}</span>
                    <button onClick={(event) => removeGenre(event, index)}>
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button className={styles.Submmit} type="submit">
              Modify
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modify;
