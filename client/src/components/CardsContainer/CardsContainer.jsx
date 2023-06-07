import Card from "../Card/Card";
import styles from "./CardsContainer.module.css";
import { Link } from "react-router-dom";

const CardsContainer = ({ currentVideogames }) => {
  return (
    <div className={styles.container}>
      {currentVideogames.map((videogame) => {
        return (
          <div key={videogame.id}>
            <Link
              to={`/videogames/${videogame.id}`}
              key={videogame.id}
              style={{ textDecoration: "none", color: "#404770" }}
            >
              <Card
                name={videogame.name}
                image={videogame.image}
                genres={videogame.genres}
                key={videogame.id}
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default CardsContainer;
