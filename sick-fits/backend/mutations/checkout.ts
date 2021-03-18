import { KeystoneContext } from '@keystone-next/types';
import {
  CartItemCreateInput,
  OrderCreateInput,
} from '../.keystone/schema-types';
import stripeConfig from '../lib/stripe';

const gql = String.raw;

export default async function checkout(
  root: any,
  { token }: { token: string },
  context: KeystoneContext
): Promise<OrderCreateInput> {
  console.log('Checking out over here');
  // Make sure they are signed in
  const userId = context.session.itemId;
  if (!userId) {
    throw new Error('Sorry! You must be signed in to create an order!');
  }
  // query the current user
  const user = await context.lists.User.findOne({
    where: { id: userId },
    resolveFields: gql`
      id
      name
      email
      cart {
        id
        quantity
        product {
          name
          price
          description
          id
          {
            photo {
              id
              image {
                id
                publicUrlTransformed
              }
            }
          }
        }
      }
    `,
  });
  console.dir(user, { depth: null });
  // Calc the total price
  const cartItems = user.cart.filter((cartItem) => cartItem.product);
  const amount = cartItems.reduce(function (tally: number, cartItem) {
    return tally + cartItem.quantity * cartItem.product.price;
  }, 0);
  // create the charge with the stripe library
  const charge = await stripeConfig.paymentIntents
    .create({
      amount,
      currency: 'USD',
      confirm: true,
      payment_method: token,
    })
    .catch((err) => {
      console.log(err);
      throw new Error(err.message);
    });
  console.log(charge);
  // convert the cartitems to order items
  // create the order and return it
  return;
}
