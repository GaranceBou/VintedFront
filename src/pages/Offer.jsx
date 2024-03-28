import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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
    <main>
      {data.product_pictures.map((pictures) => {
        return <img src={pictures.secure_url} alt="photosproduits" />;
      })}
      <aside className="aside">
        <div className="top-part">
          <p>{data.product_price}€</p>
          <div>
            {data.product_details.map((detail, index) => {
              const keys = Object.keys(detail);
              const keyName = keys[0];
              return (
                <div className="descproduct" key={index}>
                  <p className="title" key={index}>
                    {keyName}
                  </p>
                  <p className="values">: {detail[keyName]}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="bottom-part">
          <p>{data.product_name}</p>
          <p>{data.product_description}</p>
          <div className="user-part">
            <img src={data.owner.account.avatar.secure_url} alt="avatarowner" />
            <p>{data.owner.account.username}</p>
          </div>
        </div>
      </aside>
    </main>
  );
};

export default Offer;
