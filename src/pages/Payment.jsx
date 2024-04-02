import { Navigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

// clé donnée par le réacteur:
const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);

const Payment = ({ token }) => {
  const price = 5.9;
  const options = {
    mode: "payment",
    amount: Number((price * 100).toFixed(0)),
    currency: "eur",
  };

  // si l'utilisateur est connecté alors la page Payment s'affiche:
  return token ? (
    <section className="payment-background">
      <div className="payment-class">
        <div className="payment-rectangle">
          <div className="payment-details">
            <p>Résumé de la commande :</p>
          </div>
          <div className="payment-details">
            <p>Commande</p> <span>{price}€</span>
          </div>
          <div className="payment-details">
            <p>Frais protection acheteurs</p>
            <span>0.40€</span>
          </div>
          <div className="payment-details">
            <p>Frais de port</p>
            <span>0.80€</span>
          </div>
          <div className="publish-divider"></div>
          <div className="payment-details">
            <p>Total</p>
          </div>
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm price={price} />
          </Elements>
        </div>
      </div>
    </section>
  ) : (
    //si non, on redirige sur la page Login:
    <Navigate to="/login" />
  );
};

export default Payment;
