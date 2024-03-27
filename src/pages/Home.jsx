import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://lereacteur-vinted-api.herokuapp.com/offers"
      );
      setData(response.data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <Link className="link" to="/offers">
        <section>
          <div className="offers">
            {data.offers
              ? data.offers.map((offer, index) => {
                  return (
                    <div key={index}>
                      <p>{offer.owner.account.username}</p>
                      {offer.product_pictures.map((picture) => {
                        return (
                          <img
                            className="pic"
                            src={picture.secure_url}
                            alt="photo"
                          />
                        );
                      })}
                      <p>{offer.product_price}€</p>
                    </div>
                  );
                })
              : null}
          </div>
        </section>
        );
      </Link>
    </div>
  );
};

export default Home;
