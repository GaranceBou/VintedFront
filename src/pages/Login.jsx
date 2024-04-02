import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
library.add(faEye, faEyeSlash);
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Login = ({ handleToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
      if (error.response.status === 401) {
        alert("Votre adresse mail ou votre mot de passe sont incorrects.");
      }
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
        <div className="lpassword-input">
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
