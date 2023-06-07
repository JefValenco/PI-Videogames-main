import styles from "./Card.module.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";

const Card = (props) => {
  let genres = props.genres;

  if (Array.isArray(genres)) {
    genres = genres.join(" "); // join array elements with a space separator
  }

  return (
    /*   <div className={styles.card}>
      <h2 className={styles.h2}>Name:{props.name}</h2>
      <p className={styles.p}>Genere: {genres}</p>
      <img
        className={styles.img}
        src={props.image}
        width="150"
        height="150"
        alt="img"
      />
    </div> */

    /*   <div className="card" style={{ width: "18rem" }}>
      <img src={props.image} className="card-img-top" alt="img" />

      <div className="card-body">
        <p className={`card-text ${styles.h2}`}>{props.name}</p>

        <p className={`card-text ${styles.p}`}>Genere: {genres}</p>
      </div>
    </div> */

    <div className={styles.container}>
      <div className={styles["d-lg-flex"]}>
        <div className={`${styles.card} border-0 me-lg-4 mb-lg-0 mb-4`}>
          <div className={styles.backgroundEffect}></div>
          <div className={styles.pic}>
            <img className="" src={props.image} alt="img" />
            <div className={styles.title}>
              <span className={styles.month}>{props.name}</span>
            </div>
          </div>
          <div className={styles.content}>
            <p>Genere: {genres}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
