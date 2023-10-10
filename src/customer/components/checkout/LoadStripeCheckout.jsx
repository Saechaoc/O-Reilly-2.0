import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./StripeCheckout";
import styles from "./Stripe.css";
import { useLocation } from "react-router";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  "pk_test_51NwrFoBTp6tbw9GUBPCNUi5pQZJ2MCnoA3gdSsGuSWHBsVDZ9Ep5ieiwOo5OxXzURYW5LB5q9TOMVOcsx1TzeioW00e6U1ImNp"
);

export default function LoadStripeCheckout() {
  const [clientSecret, setClientSecret] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("order_id");

  useEffect(() => {
    // TODO REFACTOR INTO STATE
    fetch(`http://localhost:5454/create-payment-intent/${orderId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className={styles.root}>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm orderId={orderId} />
        </Elements>
      )}
    </div>
  );
}
