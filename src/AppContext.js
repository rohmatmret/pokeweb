import React, { createContext, useState } from 'react';


function AppContext(){
  const CartContext = createContext()

  const CartProvider = (props) => {
    let CountState = 0
    const cartStorage = window.localStorage.getItem('cart');
    if (cartStorage) {
      let count = JSON.parse(cartStorage)
      CountState = count.length
    }

    const [cart, setCart] = useState(CountState);
    
    const CartState = { cart,setCart};
    return (
      <CartContext.Provider value={CartState}>
        {props.children}
      </CartContext.Provider>
    );
  }

  
  return {
    CartContext,
    CartProvider
  }
}
export default AppContext();