//CSS :
import "./App.css";
import "./components/header.css";
import "./pages/offer.css";
import "./pages/signup.css";
import "./pages/home.css";
import "./pages/login.css";
import "./pages/publish.css";
import "./pages/payment.css";
import "./components/checkoutForm.css";

//others:
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMagnifyingGlass,
  faListAlt,
} from "@fortawesome/free-solid-svg-icons";
library.add(faMagnifyingGlass, faListAlt);

//Components :
import Header from "./components/Header";
//Pages :
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";

function App() {
  const [search, setSearch] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");

  const [token, setToken] = useState(Cookies.get("token") || null);

  const handleToken = (token) => {
    if (token) {
      Cookies.set("token", token, { expires: 10 });
      setToken(token);
    } else {
      Cookies.remove("token");
      setToken(null);
    }
  };

  return (
    <Router>
      <Header
        token={token}
        search={search}
        priceMin={priceMin}
        priceMax={priceMax}
        handleToken={handleToken}
        setSearch={setSearch}
        setPriceMin={setPriceMin}
        setPriceMax={setPriceMax}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              token={token}
              search={search}
              priceMin={priceMin}
              priceMax={priceMax}
            />
          }
        />
        <Route path="/offers/:id" element={<Offer />} />
        <Route path="/signup" element={<Signup handleToken={handleToken} />} />
        <Route path="/login" element={<Login handleToken={handleToken} />} />
        <Route path="/publish" element={<Publish token={token} />} />
        <Route path="/payment" element={<Payment token={token} />} />
      </Routes>
    </Router>
  );
}

export default App;
