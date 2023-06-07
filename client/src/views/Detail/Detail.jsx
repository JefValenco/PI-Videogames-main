import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
/* import { getType } from "../../redux/actions"; */
import { getItemById } from "../../redux/actions";
import { useParams, Link } from "react-router-dom";
import styles from "./Detail.module.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const item = useSelector((state) => state.itemById);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getItemById(id)).then(() => {
        setIsLoading(false);
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [dispatch, id]);

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page on component mount
  }, []);

  if (isLoading) {
    return (
      <div>
        <span
          className={styles.loader}
          style={{ backgroundColor: "#404770", width: "100%", height: "100%" }}
        ></span>
      </div>
    );
  }

  return (
    <div className={styles.contain}>
      {" "}
      <div className={styles.container}>
        <div className={styles["d-lg-flex"]}>
          <div className={`${styles.card} border-0 me-lg-4 mb-lg-0 mb-4`}>
            {" "}
            <div className={styles.pic}>
              <img className="" src={item.image} alt="img" />
              <div className={styles.title}>
                <span className={styles.month}>{item.name}</span>
              </div>
            </div>
            <div className={styles.container} style={{ color: "#000000" }}>
              <div className={styles.box} style={{ paddingLeft: "2em" }}>
                <h1 className={styles.label}>ID:</h1>
                <p>{item.id}</p>
                <h1 className={styles.label}>Description:</h1>

                {Array.isArray(item.description) ? (
                  <p>
                    {item.description
                      .map((desc) => desc.name || desc)
                      .join(", ")}
                  </p>
                ) : (
                  <p>{item.description || "No description available"}</p>
                )}
                <h1 className={styles.label}>Platforms: </h1>
                <p> {item.platforms}</p>
              </div>
              <div
                className={styles.box}
                style={{ paddingLeft: "9em", paddingRight: "2em" }}
              >
                <h1 className={styles.label}>Released at: </h1>
                <p>{item.released_at}</p>
                <h1 className={styles.label}>Rating: </h1>
                <p>{item.rating}</p>
                <h1 className={styles.label}>Genres: </h1>

                {Array.isArray(item.genres) ? (
                  <p>{item.genres.map((genre) => genre.name).join(", ")}</p>
                ) : (
                  <p>{item.genres}</p>
                )}
              </div>
            </div>
            <div className={styles.button}>
              <Link to="/videogames">
                <button className={styles.Submmit}>Back</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
