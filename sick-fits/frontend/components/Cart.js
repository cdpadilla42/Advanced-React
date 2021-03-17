import styled from 'styled-components';
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import { useUser } from './User';
import formatMoney from '../lib/formatMoney';
import { calcTotalPrice } from '../lib/calcTotalPrice';
import { useCart } from '../lib/cartState';
import RemoveFromCart from './RemoveFromCart';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Checkout from './Checkout';

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--lightGrey);
  display: grid;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 1 rem;
  }
  h3,
  p {
    margin: 0;
    padding-right: 0.1rem;
  }
`;

function CartItem({ cartItem }) {
  const product = cartItem.product;
  if (!product) return null;

  return (
    <CartItemStyles>
      <TransitionGroup>
        <CSSTransition
          unmountOnExit
          classNames="cart_item"
          className="cart_item"
          timeout={{ enter: 40000, exit: 40000 }}
        >
          <>
            <img
              width="100"
              src={product.photo.image.publicUrlTransformed}
              alt={product.name}
            />
            <p>{product.name}</p>
            <p>
              {formatMoney(product.price * cartItem.quantity)}–
              <em>
                {cartItem.quantity} &times; {formatMoney(product.price)}
              </em>
              <RemoveFromCart id={cartItem.id} />
            </p>
          </>
        </CSSTransition>
      </TransitionGroup>
    </CartItemStyles>
  );
}

export default function Cart() {
  const me = useUser();
  const { cartOpen, closeCart } = useCart();
  if (!me) return null;
  return (
    <CartStyles open={cartOpen}>
      <header>
        <Supreme>{me.name}'s Cart</Supreme>
      </header>
      <button onClick={closeCart}>&times;</button>
      <ul>
        {me.cart.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalPrice(me.cart))}</p>
        <Checkout />
      </footer>
    </CartStyles>
  );
}
