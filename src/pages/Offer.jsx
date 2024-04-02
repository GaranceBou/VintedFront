import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Offer = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  //ici on destructure directement:
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <p>Is loading...</p>
  ) : (
    <section className="main">
      <div className="middle-offer">
        <div className="articleimages">
          {data.product_pictures.map((pictures, index) => {
            return (
              <img
                key={index}
                className="articleimage"
                src={pictures.secure_url}
                alt="photosproduits"
              />
            );
          })}
        </div>
        <aside className="aside">
          <div className="top-part">
            <p className="offer-price">{data.product_price}€</p>
            <div className="titlevalues">
              {data.product_details.map((detail, index) => {
                const keys = Object.keys(detail);
                const keyName = keys[0];
                return (
                  <div className="descproduct" key={index}>
                    <p className="title" key={index}>
                      {keyName}
                    </p>
                    <p className="values">{detail[keyName]}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="divideroffer"></div>
          <div className="bottom-part">
            <p className="offer-name">{data.product_name}</p>
            <p className="offer-description">{data.product_description}</p>
            <div className="user-part">
              {data.owner.account.avatar && (
                <img
                  src={data.owner.account.avatar?.secure_url}
                  alt="avatarowner"
                />
              )}
              <p>{data.owner.account.username}</p>
            </div>
            <Link
              to="/payment"
              state={{ title: data.product_name, price: data.product_price }}
            >
              <button className="buy">Acheter</button>
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Offer;
