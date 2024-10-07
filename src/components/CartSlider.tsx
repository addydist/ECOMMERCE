import React from "react";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import {
  SliderContainer,
  CloseButton,
  CartContent,
  CartItem,
  ItemInfo,
  ItemTitle,
  QuantityControl,
  ItemPrice,
  QuantityButton,
  DeleteButton,
  CartTotal,
  CheckoutButton,
  EmptyCartText
} from "../style/CartSlider.style";

interface CartSliderProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSlider: React.FC<CartSliderProps> = ({ isOpen, onClose }) => {
  const { cart, updateCartItemQuantity, removeFromCart, cartTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  return (
    <SliderContainer isOpen={isOpen}>
      <CloseButton onClick={onClose}>
        <X size={24} />
      </CloseButton>
      <CartContent>
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <EmptyCartText>Your cart is empty.</EmptyCartText>
        ) : (
          <>
            {cart.map((item) => (
              <CartItem key={item.id}>
                <ItemInfo>
                  <ItemTitle>{item.title}</ItemTitle>
                  <ItemPrice>₹{(item.price * item.quantity).toFixed(2)}</ItemPrice>
                </ItemInfo>
                <QuantityControl>
                  <QuantityButton
                    onClick={() =>
                      updateCartItemQuantity(item.id, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                  >
                    <Minus size={16} />
                  </QuantityButton>
                  <span>{item.quantity}</span>
                  <QuantityButton
                    onClick={() =>
                      updateCartItemQuantity(item.id, item.quantity + 1)
                    }
                    disabled={item.quantity >= item.stock}
                  >
                    <Plus size={16} />
                  </QuantityButton>
                </QuantityControl>
                <DeleteButton onClick={() => removeFromCart(item.id)}>
                  <Trash2 size={16} />
                </DeleteButton>
              </CartItem>
            ))}
            <CartTotal>Total: ₹{cartTotal.toFixed(2)}</CartTotal>
            <CheckoutButton onClick={handleCheckout}>
              Proceed to Checkout
            </CheckoutButton>
          </>
        )}
      </CartContent>
    </SliderContainer>
  );
};

export default CartSlider;