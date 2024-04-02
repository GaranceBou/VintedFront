import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import banner from "../assets/banner.jpg";
import tear from "../assets/tear.svg";

const Home = ({ token, search, priceMin, priceMax }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?title=${search}&priceMin=${priceMin}&&priceMax=${priceMax}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [search, priceMin, priceMax]);

  return isLoading ? (
    <p>Is loading...</p>
  ) : (
    <div className="home-background">
      <section
        className="hero"
        style={{
          backgroundImage: `url(${banner})`,
        }}
      >
        <img className="tear" src={tear} alt="tear" />
        <div className="replace">
          <div className="rectangle">
            <h2>Prêts à faire du tri dans vos placards ?</h2>
            <Link to="/publish">
              <button className="startselling">Commencer à vendre</button>
            </Link>
          </div>
        </div>
      </section>
      <section className="secondpart">
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
                        {offer.owner.account.avatar && (
                          <img
                            className="avatar"
                            src={offer.owner.account.avatar?.secure_url}
                            alt="avatarowner"
                          />
                        )}
                        <p>{offer.owner.account.username}</p>
                      </div>
                      <img
                        className="productpic"
                        src={offer.product_image.secure_url}
                        alt="photo"
                      />
                      <div className="pricebrandsize">
                        <p>{offer.product_price} €</p>
                        <div className="brandsize">
                          <p>{offer.product_details[1].TAILLE} </p>
                          <p>{offer.product_details[0].MARQUE}</p>
                        </div>
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
