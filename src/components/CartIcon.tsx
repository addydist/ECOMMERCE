import React from 'react';
import styled from 'styled-components';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartIconWrapper = styled.div`
  position: relative;
  cursor: pointer;
`;

const CartCount = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #568FD1;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
`;

interface CartIconProps {
  onClick: () => void;
}

const CartIcon: React.FC<CartIconProps> = ({ onClick }) => {
  const { cart } = useCart();
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartIconWrapper onClick={onClick}>
      <ShoppingCart size={24} />
      {cartItemsCount > 0 && <CartCount>{cartItemsCount}</CartCount>}
    </CartIconWrapper>
  );
};

export default CartIcon;