import logo from "../assets/logovinted.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  return (
    <header>
      <section className="top">
        <img src={logo} alt="logo" />
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
            />
          </div>
          <div className="order">
            <div className="set">
              {/* <p>Trier par prix :</p> */}
              {/* <input className="tickprice" type="checkbox" name="price" /> */}
            </div>
            <div className="set">{/* <p>Prix entre :</p> */}</div>
          </div>
        </div>
        <div className="white">
          <button>S'inscrire</button>
          <button>Se connecter</button>
        </div>
        <button className="blue">Vends tes articles</button>
      </section>
    </header>
  );
};

export default Header;
