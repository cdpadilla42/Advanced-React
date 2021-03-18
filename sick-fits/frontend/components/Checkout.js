import { useMutation } from '@apollo/client';
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import gql from 'graphql-tag';
import nProgress from 'nprogress';
import { useState } from 'react';
import styled from 'styled-components';
import SickButton from './styles/SickButton';

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(0, 0, 0, 0.6);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`;

const CHECKOUT_MUTATION = gql`
  mutation CHECKOUT_MUTATION($token: String!) {
    checkout(token: $token) {
      id
    }
  }
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

function CheckoutForm() {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [
    checkoutMutation,
    { loading: mutationLoading, data, error: mutationError },
  ] = useMutation(CHECKOUT_MUTATION);

  async function handleSubmit(e) {
    // Stop form from submitting and turn loader on
    e.preventDefault();
    setLoading(true);
    console.log('gotta do work');
    // Start the page transition
    nProgress.start();
    // Create the payment method via stripe(token comes back here)
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    console.log(paymentMethod);
    // Handle any errors from stripe
    if (error) {
      setError(error);
    }
    // Send the token to our keystone server via custom mutation
    const result = await checkoutMutation({
      variables: { token: paymentMethod.id },
    });
    console.log(result);
    // Change the page to view the order
    // Close the cart
    // Turn the loader off
    setLoading(false);
    nProgress.done();
  }

  return (
    <CheckoutFormStyles onSubmit={handleSubmit} disabled={loading}>
      {error && <p style={{ fontSize: '12px' }}>{error.message}</p>}
      <CardElement />
      <SickButton>CHECK OUT NOW</SickButton>
    </CheckoutFormStyles>
  );
}

export default function Checkout() {
  return (
    <Elements stripe={stripeLib}>
      <CheckoutForm />
    </Elements>
  );
}
