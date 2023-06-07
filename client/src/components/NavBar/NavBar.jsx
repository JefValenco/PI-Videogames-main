import { Link } from "react-router-dom";
import style from "./NavBar.module.css";

const NavBar = () => {
  return (
    <div className={style.container}>
      <div className={style.links}>
        <Link to="/videogames" className={style.btnPrimary}>
          Videogames
        </Link>
        <Link to="/createvideogames" className={style.btnPrimary}>
          Create A Videogame
        </Link>
        <Link to="/modify" className={style.btnPrimary}>
          Modify Videogame
        </Link>
        <Link to="/" className={style.btnPrimary}>
          Landing
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
