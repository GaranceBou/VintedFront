import { Link } from "react-router-dom";
import Header from "./Header";

const Home = () => {
  return (
    <div>
      <Header />
      <Link className="link" to="/offers">
        Voir les offres
      </Link>
    </div>
  );
};

export default Home;
