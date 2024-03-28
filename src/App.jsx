import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMagnifyingGlass,
  faListAlt,
} from "@fortawesome/free-solid-svg-icons";
library.add(faMagnifyingGlass, faListAlt);
import Header from "./components/Header";
import Home from "./pages/Home";
import Offer from "./pages/Offer";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offers/:id" element={<Offer />} />
      </Routes>
    </Router>
  );
}

export default App;
