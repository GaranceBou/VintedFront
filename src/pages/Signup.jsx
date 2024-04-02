import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
library.add(faEye, faEyeSlash);
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Signup = ({ handleToken }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [avatar, setAvatar] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (password.length > 8) {
        setErrorMessage("");
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/user/signup`,
          {
            username: username,
            email: email,
            password: password,
            newsletter: newsletter,
            avatar: avatar,
          }
        );
        console.log(response.data);
        handleToken(response.data.token);
        alert("Inscription validée !");
        navigate("/");
      } else {
        setShowError(true);
      }
    } catch (error) {
      console.log(error.response.data);
      if (error.response.status === 409) {
        setErrorMessage("Un compte est déjà relié à cette adresse mail");
      } else if (error.response.data.message === "Missing parameters") {
        setErrorMessage("Tous les champs doivent être remplis");
      }
    }
  };

  return (
    <>
      <div className="formshape">
        <h1>S'inscrire</h1>
        <form
          className="formsignup"
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={handleSubmit}
        >
          <input
            value={username}
            type="text"
            placeholder="Nom d'utilisateur"
            name="username"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <div className="divider"></div>
          <input
            value={email}
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <div className="divider"></div>
          <div className="spassword-input">
            <input
              value={password}
              type={showPassword ? "text" : "password"}
              placeholder="Mot de passe"
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <FontAwesomeIcon
              className="eye"
              icon={showPassword ? "eye-slash" : "eye"}
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
          </div>

          {/* <div className="divider"></div>
          <label htmlFor="avatat-input">+ Ajoute une photo</label>
          <input
            style={{ display: "none" }}
            id="avatar-input"
            className="input-pictures"
            type="file"
            onChange={(e) => {
              setAvatar(e.target.files[0]);
            }}
          /> */}
          <div className="divider"></div>
          <div className="newsletter">
            <input
              checked={newsletter}
              className="newstick"
              type="checkbox"
              onChange={() => {
                setNewsletter(!newsletter);
              }}
            />
            <p style={{ color: "#3a3a3a" }}>S'inscrire à notre newsletter</p>
          </div>
          <p className="read">
            En t’inscrivant, tu confirmes que tu acceptes les Termes &
            Conditions de Vinted, avoir lu la Politique de confidentialité et
            avoir au moins 18 ans.
          </p>
          <button className="signupbutton" type="submit" value="Submit">
            S'inscrire
          </button>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          {showError === true && (
            <p style={{ color: "red" }}>
              Le mot de passe doit faire plus de 8 caractères.
            </p>
          )}
        </form>
        <p onClick={() => navigate("/login")} className="linkpages">
          Tu as déjà un compte ? Connecte toi !
        </p>
      </div>
    </>
  );
};

export default Signup;
