import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

const Publish = ({ token }) => {
  const navigate = useNavigate();
  const [picture, setPicture] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [pictureFromCloudinary, setPictureFromCloudinary] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("picture", picture);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("condition", condition);
      formData.append("place", place);
      formData.append("price", price);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setPictureFromCloudinary(response.data.secure_url);
      navigate("/");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return token ? (
    <section className="background-publish">
      <div className="publish-class">
        <h4>Vends ton article</h4>
        <form
          className="publish-form"
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={handleSubmit}
        >
          {pictureFromCloudinary && (
            <img src={pictureFromCloudinary} alt="uploadedphoto" />
          )}
          <div className="publish-div">
            <input
              className="input-pictures"
              type="file"
              onChange={(e) => {
                setPicture(e.target.files[0]);
              }}
            />
          </div>
          <div className="publish-div">
            <div className="pairs">
              <p>Titre</p>
              <input
                type="text"
                name="title"
                placeholder="ex: Chemise Sézane Verte"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </div>
            <div className="publish-divider"></div>
            <div className="pairs">
              <p>Décris ton article</p>
              <input
                type="text"
                name="description"
                placeholder="ex: porté quelques fois, taille correctement"
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="publish-div">
            <div className="pairs">
              <p>Marque</p>
              <input
                type="text"
                name="brand"
                placeholder="ex: Zara"
                value={brand}
                onChange={(event) => {
                  setBrand(event.target.value);
                }}
              />
            </div>
            <div className="publish-divider"></div>
            <div className="pairs">
              <p>Taille</p>
              <input
                type="text"
                name="size"
                placeholder="ex: L/40/12"
                value={size}
                onChange={(event) => {
                  setSize(event.target.value);
                }}
              />
            </div>
            <div className="publish-divider"></div>
            <div className="pairs">
              <p>Couleur</p>
              <input
                type="text"
                name="color"
                placeholder="ex: Fushia"
                value={color}
                onChange={(event) => {
                  setColor(event.target.value);
                }}
              />
            </div>
            <div className="publish-divider"></div>
            <div className="pairs">
              <p>Etat</p>
              <input
                type="text"
                name="condition"
                placeholder="ex: Neuf avec étiquette"
                value={condition}
                onChange={(event) => {
                  setCondition(event.target.value);
                }}
              />
            </div>
            <div className="publish-divider"></div>
            <div className="pairs">
              <p>Lieu</p>
              <input
                type="text"
                name="place"
                placeholder="ex: Nantes"
                value={city}
                onChange={(event) => {
                  setCity(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="publish-div">
            <div className="pairs">
              <p>Prix</p>
              <div className="publish-setprice">
                <input
                  type="text"
                  name="price"
                  placeholder="ex: 0,00€"
                  value={price}
                  onChange={(event) => {
                    setPrice(event.target.value);
                  }}
                />
                <div className="publish-exchanges">
                  <input
                    className="exchanges"
                    type="checkbox"
                    name="exchanges"
                  />
                  <p style={{ fontSize: "11px" }}>
                    Je suis interessé(e) par les échanges
                  </p>
                </div>
              </div>
            </div>
          </div>
          <button className="add" type="submit">
            Ajouter
          </button>
        </form>
      </div>
    </section>
  ) : (
    <Navigate to="/login" />
  );
};

export default Publish;
