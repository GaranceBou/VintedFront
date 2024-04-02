import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";

const CheckoutForm = ({ title, price }) => {
  const stripe = useStripe();
  const elements = useElements();

  // messages d'erreurs:
  const [errorMessage, setErrorMessage] = useState(null);
  // paiement effectué:
  const [completed, setCompleted] = useState(false);
  // paiement en cours:
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // chargement en cours:
    setIsLoading(true);

    if (elements == null) {
      return;
    }

    // Vérification et validation des infos entrées dans les inputs
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(error.message);
      return;
    }

    // on envoie une requête au backend renvoie le clientSecret:
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/v2/payment`,
      {
        title: title,
        amount: price,
      }
    );

    const clientSecret = response.data.client_secret;

    // on envoie une requête à Stripe pour valider le paiement:
    const stripeResponse = await stripe.confirmPayment({
      // infos et configuration du paiement:
      elements,
      clientSecret,
      // éventuelle redirection:
      confirmParams: {
        return_url: "http://localhost:5173/",
      },
      redirect: "if_required",
    });
    console.log(stripeResponse);
    // en cas d'erreur:
    if (stripeResponse.error) {
      setErrorMessage(stripeResponse.error.message);
    }

    // en cas de succès:
    if (stripeResponse.paymentIntent.status === "succeeded") {
      setCompleted(true);
    }
    // chargement terminé:
    setIsLoading(false);
  };

  return completed ? (
    <p>Paiement effectué</p>
  ) : (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        className="pay-button"
        type="submit"
        disabled={!stripe || !elements || isLoading}
      >
        Payer
      </button>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

export default CheckoutForm;
