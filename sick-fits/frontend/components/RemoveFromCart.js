import { gql, useMutation } from '@apollo/client';
import styled from 'styled-components';
import { CURRENT_USER_QUERY } from './User';

const REMOVE_FROM_CART = gql`
  mutation REMOVE_FROM_CART($id: ID!) {
    deleteCartItem(id: $id) {
      id
    }
  }
`;

const StyledButton = styled.button`
  display: inline-block;
  background-color: var(--black);
  color: white;
  border: none;
  line-height: 2rem;
  margin-left: 1rem;

  &:hover {
    cursor: pointer;
  }
`;

export default function RemoveFromCart({ id }) {
  const [removeFromCart, { loading }] = useMutation(REMOVE_FROM_CART, {
    variables: { id },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  return (
    <StyledButton
      type="button"
      title="Remove This Item from Cart"
      onClick={removeFromCart}
      disabled={loading}
    >
      &times;
    </StyledButton>
  );
}
