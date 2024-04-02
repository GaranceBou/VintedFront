import logo from "../assets/logovinted.png";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({ token, search, handleToken, setSearch }) => {
  const navigate = useNavigate();
  return (
    <header>
      <section className="top">
        <Link to="/">
          <img className="logovinted" src={logo} alt="logo" />
        </Link>
        <div className="header-price">
          <div className="bar">
            <span>
              <FontAwesomeIcon
                icon="fa-solid fa-magnifying-glass"
                style={{ color: "#bbbbbb" }}
              />
            </span>
            <input
              className="search"
              type="text"
              placeholder="Recherche des articles"
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
          </div>
          {/* <div className="order">
            <div className="set">
              <p>Trier par prix :</p>
              <input className="tickprice" type="checkbox" name="price" />
            </div>
            <div className="set">
              <p>Prix entre :</p>
            </div>
          </div> */}
        </div>
        {token ? (
          <button
            className="disconnect"
            onClick={() => {
              handleToken(null);
              navigate("/");
            }}
          >
            Déconnexion
          </button>
        ) : (
          <div className="white">
            <Link to="/signup">
              <button>S'inscrire</button>
            </Link>
            <Link to="/login">
              <button>Se connecter</button>
            </Link>
          </div>
        )}
        <div className="blue">
          <Link to="/publish">
            <button>Vends tes articles</button>
          </Link>
        </div>
      </section>
    </header>
  );
};

export default Header;
