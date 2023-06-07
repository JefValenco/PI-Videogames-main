import { useState } from "react";
import styles from "../../views/Form/Form.module.css";
import axios from "axios";
import { getGenre } from "../../redux/actions";
import { getDeleteVideogames } from "../../redux/actions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { validate } from "../../middleware/validate";

const Form = () => {
  const dispatch = useDispatch();

  //----------States----------//
  const [form, setForm] = useState({
    name: "",
    description: "",
    platforms: "",
    released_at: "",
    rating: "",
    image: "",
    genres: [],
  });

  const [formDelete, setFormDelete] = useState({
    name: "",
  });

  //----------Reset States----------//

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      platforms: "",
      released_at: "",
      rating: "",
      image: "",
      genres: [],
    });
  };

  const resetFormDelete = () => {
    setFormDelete({
      name: "",
    });
  };

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    platforms: "",
    released_at: "",
    rating: "",
    image: "",
    genres: [],
  });

  //----------Change Handlers----------//

  const changeHandler = (event, index) => {
    const property = event.target.name;
    const value = event.target.value;

    validate({ ...form, [property]: value }, errors, setErrors);
    setForm({ ...form, [property]: value });
  };

  const changeHandlerDelete = (event, index) => {
    const property = event.target.name;
    const value = event.target.value;

    setFormDelete({ ...formDelete, [property]: value });
  };

  const changeHandlerGenre = (event) => {
    const value = event.target.value;

    if (!form.genres.includes(value)) {
      setForm({ ...form, genres: [...form.genres, value] });
    }
  };

  //----------Summit Form Validation ----------//

  const requiredFields = [
    { field: "name", message: "Please enter a name for your Pokemon." },
    {
      field: "description",
      message: "Please enter the description points for your Pokemon.",
    },
    {
      field: "platforms",
      message: "Please enter the platforms points for your Pokemon.",
    },
    {
      field: "released_at",
      message: "Please enter the released year points for your Pokemon.",
    },
    {
      field: "rating",
      message: "Please enter the rating year points for your Pokemon.",
    },
    {
      field: "image",
      message: "Please enter the image points for your Pokemon.",
    },
    { field: "genres", message: "Please enter the genres of your Pokemon." },
  ];

  //----------Summit Handlers----------//

  const submitHandler = (event) => {
    event.preventDefault();

    // Check if required fields are missing
    for (const { field, message } of requiredFields) {
      if (!form[field]) {
        alert(message);
        return;
      }
    }

    // Check if at least one genres is selected
    if (form.genres.length === 0 || form.genres.includes("")) {
      alert("Please select at least one genre for your Pokemon.");
      return;
    }

    // Send form data to server
    axios
      .post("http://localhost:3005/videogame", form)
      .then((res) => {
        alert("Videogame created!");
        resetForm();
        window.location.reload();
      })
      .catch((err) => alert(err));
  };

  const submitHandlerDelete = (event) => {
    event.preventDefault();
    axios
      .delete(`http://localhost:3005/videogame?name=${formDelete.name}`)
      .then((res) => {
        alert("Videogame deleted!");
        resetFormDelete();
        window.location.reload();
      })
      .catch((err) => alert(err));
  };

  //----------Dispatches Handlers----------//

  useEffect(() => {
    dispatch(getGenre());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getDeleteVideogames());
  }, [dispatch]);

  //---------- Selectors ----------//

  const videogames = useSelector((state) => state.deleteItem);

  const genres = useSelector((state) => state.genres);

  //----------Complementary  fn ----------//

  const removeGenre = (event, index) => {
    event.preventDefault(); // prevent form submission
    const newGenre = [...form.genres];
    newGenre.splice(index, 1);
    setForm({ ...form, genres: newGenre });
  };

  //---------- Render  ----------//

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.container}>
          <div className={styles.box}>
            {" "}
            <h1 className={styles.h4}>Create Videogame</h1>
            {/*  <form action="POST" onSubmit={submitHandler}>
  <div>
    <label>Name: </label>
    <input
      type="text"
      value={form.name}
      onChange={changeHandler}
      name="name"
    ></input>
    {errors.name && <span>{errors.name}</span>}
  </div>

  <div>
    <label>description</label>
    <input
      type="text"
      value={form.description}
      onChange={changeHandler}
      name="description"
    ></input>
  </div>

  <div>
    <label>Platforms: </label>
    <select
      value={form.platforms}
      onChange={changeHandler}
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
    <label>Released year: </label>
    <input
      type="text"
      value={form.released_at}
      onChange={changeHandler}
      name="released_at"
    ></input>
  </div>

  <div>
    <label>Rating: </label>
    <input
      type="text"
      value={form.rating}
      onChange={changeHandler}
      name="rating"
    ></input>
  </div>

  <div>
    <label>Image: </label>
    <select value={form.image} onChange={changeHandler} name="image">
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
  </div>

  <div>
    <label className={styles.label}>Genres: </label>
    <select
      className={styles.input}
      placeholder="Choose a genre"
      recipe="text"
      onChange={changeHandlerGenre}
      name="genre"
    >
      <option value="" disabled selected>
        Choose genre
      </option>
      <option value=""></option>
      {genres &&
        genres
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
      {form.genres.map((genres, index) => (
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
    Create
  </button>
</form> */}
            <form onSubmit={submitHandler}>
              <div>
                <label className={styles.label}>Name: </label>
                <input
                  className={styles.input}
                  type="text"
                  value={form.name}
                  onChange={changeHandler}
                  name="name"
                ></input>
              </div>

              <div>
                <label className={styles.label}>description</label>
                <input
                  className={styles.input}
                  type="text"
                  value={form.description}
                  onChange={changeHandler}
                  name="description"
                ></input>
              </div>

              <div>
                <label className={styles.label}>Platforms: </label>
                <select
                  className={styles.input}
                  value={form.Platforms}
                  onChange={changeHandler}
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
                <label className={styles.label}>Released year: </label>
                <input
                  className={styles.input}
                  type="text"
                  value={form.released_at}
                  onChange={changeHandler}
                  name="released_at"
                ></input>
              </div>

              <div>
                <label className={styles.label}>Rating: </label>
                <input
                  className={styles.input}
                  type="text"
                  value={form.rating}
                  onChange={changeHandler}
                  name="rating"
                ></input>
              </div>

              <div>
                <label className={styles.label}>Image: </label>
                <select
                  className={styles.input}
                  value={form.image}
                  onChange={changeHandler}
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
                  {form.image && (
                    <img
                      src={form.image}
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
                  {genres &&
                    genres
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
                  {form.genres.map((genres, index) => (
                    <div key={index}>
                      <span className={styles.type}>{genres}</span>
                      <button
                        className={styles.Submmit2}
                        onClick={(event) => removeGenre(event, index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button className={styles.Submmit} type="submit">
                Create
              </button>
            </form>
          </div>
          <div className={styles.box}>
            {" "}
            <h1 className={styles.h4}>Delete Videogame</h1>
            <form onSubmit={submitHandlerDelete}>
              <div>
                <label className={styles.label}>Name: </label>
                <select
                  className={styles.input}
                  placeholder="Choose a videogame to delete..."
                  videogame="text"
                  value={formDelete.name}
                  onChange={changeHandlerDelete}
                  name="name"
                >
                  <option value="videogame"></option>
                  {videogames &&
                    videogames
                      .sort((a, b) => {
                        if (a.name < b.name) return -1;
                        if (a.name > b.name) return 1;
                        return 0;
                      })
                      .map((videogame) => {
                        return (
                          <option value={videogame.name} key={videogame.id}>
                            {videogame.name}
                          </option>
                        );
                      })}
                </select>
              </div>

              <button
                className={`${styles.Submmit} ${
                  form.name ? "" : styles.disabled
                }`}
                disabled={!formDelete.name}
                type="submit"
              >
                Confirm Delete
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
