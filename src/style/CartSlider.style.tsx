import styled from 'styled-components';
export const SliderContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: ${(props) => (props.isOpen ? '0' : '-400px')};
  width: 400px;
  height: 100vh;
  background-color: #ffffff;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  transition: right 0.4s ease-in-out;
  z-index: 1000;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0; 
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #ff0000;
  }
`;

 export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
`;

 export const CartContent = styled.div`
  padding: 20px;
`;

 export const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
`;

 export const ItemInfo = styled.div`
  flex: 1;
`;

 export const ItemTitle = styled.h3`
  margin: 0;
  font-size: 16px;
`;

 export const ItemPrice = styled.p`
  margin: 5px 0 0;
  font-size: 14px;
  color: #666;
`;

 export const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

 export const QuantityButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

 export const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #ff4d4f;
`;

 export const CartTotal = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
  text-align: right;
`;

 export const CheckoutButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #0D2E52;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #0056b3;
  }
`;
export const EmptyCartText = styled.p`
  font-size: 18px;
  color: #666;
  text-align: center;
  margin-top: 20px;
`;

