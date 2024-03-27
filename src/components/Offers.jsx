import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";

const Offers = () => {
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
    <section>
      <Header />
      <div>
        {data.offers
          ? data.offers.map((offer, index) => {
              return (
                <div key={index}>
                  <p>{offer.product_name}</p>
                </div>
              );
            })
          : null}
      </div>
    </section>
  );
};

export default Offers;
