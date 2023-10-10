import logo from "./logo.svg";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import CustomerRouters from "./routers/CustomerRouters";
import "./styles.css";

function App() {
  return (
    <main className="relative">
      <Routes>
        <Route path="/*" element={<CustomerRouters />}></Route>
      </Routes>
    </main>
  );
}

export default App;

// import React, { useState, useEffect } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";

// import "./App.css";
// import CheckoutForm from "./customer/components/checkout/StripeCheckout";

// // Make sure to call loadStripe outside of a component’s render to avoid
// // recreating the Stripe object on every render.
// // This is your test publishable API key.
// const stripePromise = loadStripe(
//   "pk_test_51NwrFoBTp6tbw9GUBPCNUi5pQZJ2MCnoA3gdSsGuSWHBsVDZ9Ep5ieiwOo5OxXzURYW5LB5q9TOMVOcsx1TzeioW00e6U1ImNp"
// );

// export default function App() {
//   const [clientSecret, setClientSecret] = useState("");

//   useEffect(() => {
//     // Create PaymentIntent as soon as the page loads
//     fetch("http://localhost:5454/create-payment-intent", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
//     })
//       .then((res) => res.json())
//       .then((data) => setClientSecret(data.clientSecret));
//   }, []);

//   const appearance = {
//     theme: "stripe",
//   };
//   const options = {
//     clientSecret,
//     appearance,
//   };

//   return (
//     <div className="App">
//       {clientSecret && (
//         <Elements options={options} stripe={stripePromise}>
//           <CheckoutForm />
//         </Elements>
//       )}
//     </div>
//   );
// }
