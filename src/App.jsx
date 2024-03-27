import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import logo from "./assets/logovinted.png";
import banner from "./assets/banner.jpg";
import Header from "./components/Header";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMagnifyingGlass,
  faListAlt,
} from "@fortawesome/free-solid-svg-icons";
library.add(faMagnifyingGlass, faListAlt);
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://lereacteur-vinted-api.herokuapp.com/offers"
      );
      setData(response.data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <header>
      <section className="top">
        <img src={logo} alt="logo" />
        <div className="price">
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
              <p>Trier par prix :</p>
              <input className="tickprice" type="checkbox" name="price" />
            </div>
            <div className="set">
              <p>Prix entre :</p>
            </div>
          </div>
        </div>
        <div className="white">
          <button>S'inscrire</button>
          <button>Se connecter</button>
        </div>
        <button className="blue">Vends tes articles</button>
      </section>
      <section
        className="hero"
        style={{
          backgroundImage: `url(${banner})`,
        }}
      >
        <div className="replace">
          <div className="rectangle">
            <h2>Prêts à faire du tri dans vos placards ?</h2>
            <button className="startselling">Commencer à vendre</button>
          </div>
        </div>
      </section>
    </header>
  );
  // <div>
  //     {data.offers.map((offer, index) => {
  //       return (
  //         <div key={index}>
  //           <p>{offer.product_description}</p>
  //         </div>
  //       );
  //     })}
  //   </div>
}

export default App;
