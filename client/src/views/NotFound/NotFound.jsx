import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";
import { useState } from "react";
import { useEffect } from "react";

function NotFound() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div>
        <span
          className={styles.loader}
          style={{
            backgroundColor: "rgba(34, 34, 34, 0.95)",
            width: "100%",
            height: "100%",
            marginTop: "95px",
          }}
        ></span>
      </div>
    );
  }

  return (
    <div /* className={styles.background} */>
      <div className={styles.content}>
        <div>
          <p className={styles.p}>Oops! Error 404</p>
          <h1 className={styles.h1}> Page not found.</h1>
        </div>
        <div className={styles.contentButton}>
          <Link to="/pokemons">
            <button className={styles.btnPrimary}>Back Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
