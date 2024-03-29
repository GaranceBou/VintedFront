import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ handleToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        }
      );
      console.log(response.data);
      handleToken(response.data.token);
      navigate("/");
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
        <button type="submit" className="loginbutton">
          Se connecter
        </button>
      </form>
      <p className="linkpages" onClick={() => navigate("/signup")}>
        Pas encore de compte ? Inscris toi !
      </p>
    </div>
  );
};

export default Login;
