import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Signup = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [showError, setShowError] = useState(false);
  const [token, setToken] = useState("");

  Cookies.set("token", token), { expires: 3 };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (password.length > 8) {
        setShowError(false);
        const response = await axios.post(
          "https://lereacteur-vinted-api.herokuapp.com/user/signup",
          {
            username: username,
            email: email,
            password: password,
            newsletter: newsletter,
          }
        );
        console.log(response.data);
        setData(response.data);
        setToken(response.data.token);
        alert("Inscription validée !");
      } else {
        setShowError(true);
      }
    } catch (error) {
      console.log(error.response);
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
            onChange={(e) => {
              setUsername(e.target.value);
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
          <input
            value={password}
            type="password"
            placeholder="Mot de passe"
            name="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className="divider"></div>
          <div className="newsletter">
            <input
              checked={newsletter}
              className="newstick"
              type="checkbox"
              onChange={(e) => {
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
