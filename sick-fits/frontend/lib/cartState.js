import { useState } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function CartStateProvider({ children }) {
  // This is the custom provider
  // We will store state and functionality in here
  // Anyone can access it via consumer
  const [cartOpen, setCartOpen] = useState(false);

  function openCart() {
    setCartOpen(true);
  }
  function closeCart() {
    setCartOpen(false);
  }

  return (
    <LocalStateProvider value={{ cartOpen, openCart, closeCart }}>
      {children}
    </LocalStateProvider>
  );
}

// Custom hook for accessing the cart local state
function useCart() {
  const all = useContext(LocalStateContext);
  return all;
}

export { CartStateProvider, useCart };
