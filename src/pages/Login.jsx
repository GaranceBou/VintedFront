import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {}
      );
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="formshapelogin">
      <h1>Se connecter</h1>
      <form
        className="formlogin"
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit}
      >
        <input
          value={email}
          type="email"
          placeholder="Adresse email"
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
        <button className="loginbutton">Se connecter</button>
      </form>
      <p className="linkpages" onClick={() => navigate("/signup")}>
        Pas encore de compte ? Inscris toi !
      </p>
    </div>
  );
};

export default Login;
