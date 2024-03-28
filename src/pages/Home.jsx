import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <p>Is loading...</p>
  ) : (
    <div>
      <section>
        <div className="offers">
          {data.offers
            ? data.offers.map((offer) => {
                return (
                  <Link
                    key={offer._id}
                    className="link"
                    to={`/offers/${offer._id}`}
                  >
                    <article>
                      <div className="owner">
                        <img
                          className="avatar"
                          src={offer.owner.account.avatar.secure_url}
                          alt="avatarowner"
                        />
                        <p>{offer.owner.account.username}</p>
                      </div>
                      <img
                        className="pic"
                        src={offer.product_image.secure_url}
                        alt="photo"
                      />
                      <p>{offer.product_price} €</p>
                      <div className="brandsize">
                        <p>{offer.product_details[1].TAILLE}</p>
                        <p>{offer.product_details[0].MARQUE}</p>
                      </div>
                    </article>
                  </Link>
                );
              })
            : null}
        </div>
      </section>
    </div>
  );
};

export default Home;
