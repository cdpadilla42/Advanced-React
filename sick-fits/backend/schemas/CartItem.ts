import { integer, relationship, select, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const CartItem = list({
  fields: {
    // TODO: Custom Label in here
    quantity: integer({ isRequired: true, defaultValue: 1 }),
    product: relationship({
      ref: 'Product',
    }),
    user: relationship({ ref: 'User.cart' }),
  },
  ui: {
    listView: {
      initialColumns: ['product', 'quantity', 'user'],
    },
  },
});
