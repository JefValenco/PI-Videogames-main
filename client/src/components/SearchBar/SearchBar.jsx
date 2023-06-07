import React, { useState } from "react";
import styles from "./SearchBar.module.css";
import { useDispatch } from "react-redux";
import { getItemByName } from "../../redux/actions";

function SearchBar() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlechangeSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleClickSearch = () => {
    setIsLoading(true);

    // Start the timer
    setTimeout(() => {
      // Your asynchronous operation (e.g., API call) here
      dispatch(getItemByName(search)).then(() => {
        setIsLoading(false);
      });

      setSearch("");
    }, 800);
  };

  const handleClearSearch = () => {
    setIsLoading(true);

    setTimeout(() => {
      dispatch(getItemByName("")).then(() => {
        setIsLoading(false);
      });
      setSearch("");
    }, 200);
  };

  const handleSubmitSearch = (event) => {
    event.preventDefault();
    if (search) {
      dispatch(getItemByName(search));
      setSearch("");
    }
  };

  return (
    <div onSubmit={handleSubmitSearch}>
      <div className={styles.searchBar}>
        <input
          onChange={handlechangeSearch}
          type="tex"
          placeholder="Search your videogame"
          value={search}
        />
        <button
          disabled={!search}
          onClick={handleClickSearch}
          className={styles.btnPrimary}
        >
          Search
        </button>
        <button onClick={handleClearSearch} className={styles.btnPrimary}>
          Clear
        </button>
      </div>
      {isLoading && (
        <div>
          <span
            className={styles.loader}
            style={{
              backgroundColor: "rgba(34, 34, 34, 0.95)", // Opacity of 0.5
              width: "100%",
              height: "100%",
            }}
          ></span>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
