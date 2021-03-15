import { gql, useMutation } from '@apollo/client';

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart(productId: $id) {
      id
      quantity
    }
  }
`;

export default function AddToCart({ id }) {
  const [addToCart] = useMutation(ADD_TO_CART_MUTATION, { variables: { id } });
  return (
    <button type="button" onClick={addToCart}>
      Add To Cart 🛒
    </button>
  );
}
