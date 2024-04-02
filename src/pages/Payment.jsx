import { Navigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { useLocation } from "react-router-dom";

// clé donnée par le réacteur:
const stripePromise = loadStripe(`${import.meta.env.VITE_STRIPE_KEY}`);

const Payment = ({ token }) => {
  const location = useLocation();
  const { title } = location.state;
  const { price } = location.state;

  const options = {
    mode: "payment",
    amount: Number((price * 100).toFixed(0)),
    currency: "eur",
  };
  const protection = Number((price * 0.12).toFixed(1));
  const delivery = Number(1.8);
  const total = (price + protection + delivery).toFixed(1);

  // si l'utilisateur est connecté alors la page Payment s'affiche:
  return token ? (
    <section className="payment-background">
      <div className="payment-class">
        <div className="payment-rectangle">
          <div className="payment-resume">
            <p>Résumé de la commande</p>
          </div>
          <div className="payment-details">
            <p>Commande</p> <span>{price}€</span>
          </div>
          <div className="payment-details">
            <p>Frais protection acheteurs</p>
            <span>{protection}€</span>
          </div>
          <div className="payment-details">
            <p>Frais de port</p>
            <span>{delivery}€</span>
          </div>
          <div className="payment-divider"></div>
          <div className="total">
            <p>Total</p>
            <span>{total}€</span>
          </div>
          <p className="payment-laststep">
            Il ne vous reste plus qu'une étape pour vous offrir
            <span style={{ fontWeight: "bold" }}> {title}</span>. Vous allez
            payer
            <span style={{ fontWeight: "bold" }}> {total}€</span> (tous frais
            inclus).
          </p>
          <div className="checkout-form">
            <Elements stripe={stripePromise} options={options}>
              <CheckoutForm price={price} title={title} />
            </Elements>
          </div>
        </div>
      </div>
    </section>
  ) : (
    //si non, on redirige sur la page Login:
    <Navigate to="/login" />
  );
};

export default Payment;
