import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMagnifyingGlass,
  faListAlt,
} from "@fortawesome/free-solid-svg-icons";
library.add(faMagnifyingGlass, faListAlt);
import Header from "./components/Header";

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

  return isLoading ? <span>En cours de chargement... </span> : <Header />;

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
