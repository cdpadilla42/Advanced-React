import stripe from 'stripe';

const stripeConfig = new stripe(process.env.STRIPE_SECRET || '', {
  apiVersion: '2020-08-27',
});

export default stripeConfig;
