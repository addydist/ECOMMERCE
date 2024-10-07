import React from 'react';
import styled from 'styled-components';
import { Button } from '../styles';
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const Text = styled.p`
  margin-bottom: 10px;
`;

interface SuccessModalProps {
  onClose: () => void;
  transactionId?: string;
  orderReferenceId: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ onClose, transactionId, orderReferenceId }) => (
  <ModalOverlay onClick={onClose}>
    <ModalContent onClick={(e) => e.stopPropagation()}>
      <Title>Order Placed Successfully!</Title>
      <Text>Thank you for your purchase.</Text>
      <Text>Order Reference ID: {orderReferenceId}</Text>
      {transactionId && <Text>Transaction ID: {transactionId}</Text>}
      <Button onClick={onClose}>Close</Button>
    </ModalContent>
  </ModalOverlay>
);

export default SuccessModal;