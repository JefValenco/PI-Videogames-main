import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";

import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import Paged from "../../components/Paged/Paged";
import styles from "./Home.module.css";
import SearchBar from "../../components/SearchBar/SearchBar";

import Detail from "../../views/Detail/Detail";
import Form from "../../views/Form/Form";
import Modify from "../../views/Modify/Modify";
import { up } from "../../images/images.js";
import { banner1 } from "../../images/images.js";
import { banner2 } from "../../images/images.js";
import { welcome } from "../../images/images.js";
import { create } from "../../images/images.js";
import { modify } from "../../images/images.js";
import { wizard } from "../../images/images.js";

import {
  getVideogames,
  FilterByGenre,
  FilterByCreated,
  orderByAZ,
  orderByRating,
  getItemByName,
  getGenre,
} from "../../redux/actions";

const Home = () => {
  const allVideogames = useSelector((state) => state.videogames);

  const [isLoading2, setIsLoading2] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [order, setOrder] = useState("");

  const [search, setSearch] = useState("");

  const getGenres = useSelector((state) => state.genres);

  const [currentPage, setCurrentPage] = useState(1);
  const [videogamesPerPage, setVideogamesPerPage] = useState(8);
  const indexOfLastVideogame = currentPage * videogamesPerPage;
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
  const currentVideogames = allVideogames.slice(
    indexOfFirstVideogame,
    indexOfLastVideogame
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getVideogames()).then(() => {
        setIsLoading(false);
      });
    }, 800);

    return () => clearTimeout(timer);
  }, [dispatch]);

  function handleSortGenres(e) {
    setIsLoading2(true); // Show loader

    setTimeout(() => {
      if (currentPage !== 1) {
        setCurrentPage(1);
      }

      dispatch(FilterByGenre(e.target.value));

      setIsLoading2(false); // Hide loader
    }, 500);
  }

  useEffect(() => {
    dispatch(getGenre());
  }, [dispatch]);

  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  /* ---------- */

  const [displayButton, setDisplayButton] = useState(false);

  const scrollFunction = () => {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      setDisplayButton(true);
    } else {
      setDisplayButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollFunction);
    return () => {
      window.removeEventListener("scroll", scrollFunction);
    };
  }, []);

  const backToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  /* ---------- */

  function handleSortCreated(e) {
    setIsLoading2(true); // Show loader

    setTimeout(() => {
      if (currentPage !== 1) {
        setCurrentPage(1);
      }

      dispatch(FilterByCreated(e.target.value));

      setIsLoading2(false); // Hide loader
    }, 500);
  }

  function handleSort(e) {
    e.preventDefault();
    const sortOrder = e.target.value;

    setIsLoading2(true); // Show loader

    setTimeout(() => {
      if (currentPage !== 1) {
        setCurrentPage(1);
      }

      console.log(sortOrder);
      dispatch(orderByAZ(sortOrder));

      setOrder(sortOrder);
      setIsLoading2(false); // Hide loader
    }, 500);
  }

  function handleSortRating(e) {
    e.preventDefault();
    const sortOrder = e.target.value;

    setIsLoading2(true); // Show loader

    setTimeout(() => {
      if (currentPage !== 1) {
        setCurrentPage(1);
      }

      console.log(sortOrder);
      dispatch(orderByRating(sortOrder));

      setOrder(sortOrder);
      setIsLoading2(false); // Hide loader
    }, 500);
  }

  const handleClearSearch = () => {
    setIsLoading2(true);

    setTimeout(() => {
      dispatch(getItemByName("")).then(() => {
        setIsLoading2(false);
      });
      setSearch("");
    }, 600);
  };

  if (isLoading) {
    return (
      <div>
        <span
          className={styles.loader}
          style={{ backgroundColor: "#6B75A8", width: "100%", height: "100%" }}
        ></span>
      </div>
    );
  }

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      {/* Scroll-up Button*/}
      <button
        type="button"
        className={`btn  btn-floating btn-lg ${styles.backToTop}`}
        id="btn-back-to-top"
        onClick={backToTop}
      >
        <img src={up} alt="up" className={styles.imageSide} />
      </button>
      {/* NavBar section */}
      <div id="videogamesSection">
        <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
          <button
            /*  className="navbar-toggler" */

            className={`navbar-toggler ${styles.toggler}`}
            type="button"
            onClick={toggleCollapse}
            aria-expanded={!collapsed}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`collapse navbar-collapse ${collapsed ? "" : "show"}`}
            id="navbarTogglerDemo01"
          >
            <ul
              className={`navbar-nav mr-auto mt-2 mt-lg-0 ${styles.linksNav}`}
            >
              <li className="nav-item active">
                <a
                  className={`nav-link ${styles.btnNav}`}
                  href="#videogamesSection"
                >
                  Videogames
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${styles.btnNav}`}
                  href="#createSection"
                >
                  Create Videogame
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${styles.btnNav}`}
                  href="#modifySection"
                >
                  Modify Videogame
                </a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${styles.btnNav}`} href="/">
                  Landing
                </a>
              </li>
              <li className="nav-item">
                <SearchBar />
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {/* People Section */}

      <div
        className={styles.containerSection}
        style={{
          paddingTop: "7em",
          zIndex: "2",
          position: "absolute",
          /* backgroundColor: "#6B75A8", */
        }}
      >
        <img src={welcome} alt="welcome" className={styles.imageWelcome} />
        <img
          src={banner1}
          alt="banner1"
          className={styles.imageBanner1}
          style={{ paddingTop: "2em" }}
        />
      </div>

      {/* Content Section */}

      <div>
        {" "}
        <div>
          <div className={styles.containerFilter}>
            <div className={styles.box}>
              <select
                className={styles["style-dropdown"]}
                onChange={(e) => handleSortCreated(e)}
              >
                <option value="All">All Created</option>

                <option value="true">Data base</option>
                <option value="false">Api</option>
              </select>

              <select
                className={styles["style-dropdown"]}
                onChange={(e) => handleSortGenres(e)}
              >
                <option value="" disabled selected hidden>
                  Select Genre
                </option>

                <option value="All"> Clear</option>

                <option value=""></option>
                {getGenres &&
                  getGenres
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

              <select
                className={styles["style-dropdown"]}
                onChange={(e) => handleSort(e)}
              >
                <option value="" disabled selected hidden>
                  Select an Order
                </option>
                <option value="des">A - Z</option>
                <option value="asc">Z - A</option>
                <option value="clear">Clear</option>
              </select>

              <select
                className={styles["style-dropdown"]}
                onChange={(e) => handleSortRating(e)}
              >
                <option value="" disabled selected hidden>
                  Select an Rating
                </option>
                <option value="asc">Higher Rating</option>
                <option value="des">Lower Rating</option>
                <option value="clear">Clear</option>
              </select>
            </div>
          </div>
        </div>
        {/* Cards Section */}
        <div
          style={{
            marginTop: "2em",
          }}
        >
          {currentVideogames.length > 0 ? (
            <CardsContainer currentVideogames={currentVideogames} />
          ) : (
            <div>
              {" "}
              <p className={styles.p1} style={{ color: "#ffffff" }}>
                Videogame not found...
              </p>
              <button onClick={handleClearSearch} className={styles.btnPrimary}>
                Try again!
              </button>
            </div>
          )}
        </div>
        {/* Paged Section */}
        <Paged
          videogamesPerPage={videogamesPerPage}
          allVideogames={allVideogames.length}
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>

      {/* Create Section */}

      <div
        className={styles.containerSection}
        style={{
          position: "relative",
        }}
      >
        <img
          id="createSection"
          src={create}
          alt="create"
          className={styles.imageCreate}
          style={{ paddingTop: "4em" }}
        />
        <Form />
        <img src={wizard} alt="wizard" className={styles.imageWizard} />
      </div>

      {/* Banner2 Section */}
      <div>
        <img
          src={banner2}
          alt="banner2"
          className={styles.imageBanner2}
          style={{ paddingTop: "2em" }}
        />
      </div>

      {/* Modify Section */}
      <div className={styles.containerSection}>
        <img
          id="modifySection"
          src={modify}
          alt="modify"
          className={styles.imageModify}
          style={{ paddingTop: "7em" }}
        />
        <Modify />
      </div>

      {/* Create Footer */}
      <div
        className={styles.footer}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          paddingTop: "5em",
          paddingTop: "5em",
        }}
      >
        <p className={styles.p5}>
          "©2023 This website was created by Jefry Valenco using the data of
          Rawg Api."
        </p>
      </div>

      {isLoading2 && (
        <div>
          <span
            className={styles.loader}
            style={{
              backgroundColor: "rgba(107, 117, 168, 0.8)",
              width: "100%",
              height: "100%",
            }}
          ></span>
        </div>
      )}
    </div>
  );
};

export default Home;
