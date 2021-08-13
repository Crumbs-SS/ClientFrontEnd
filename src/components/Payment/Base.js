import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import "./Base.css";

const promise = loadStripe("pk_test_51JNmSeBoRXU1dvNXVuxS9tBZUvQ7M1ljZt34Xa3LHyN3B4zVvr87mpwQXAoEYGjA8xX5ddqjRbXzv7AOI35cjXUw00NTjXVC09");

const Base = () => {

    return (
        <div className="App">
          <Elements stripe={promise}>
            <CheckoutForm />
          </Elements>
        </div>
      );


}
export default Base;