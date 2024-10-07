import React from "react";
import styled from "styled-components";

const SpinnerOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 1000;
`;

const Spinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.p`
  color: white;
  margin-top: 20px;
  font-size: 18px;
`;
console.log("heheh is it happeoniho");
interface LoadingProps {
    text?: string;
  }
const LoadingSpinner: React.FC<LoadingProps>=({text}) => {
  return (
      <SpinnerOverlay>
        <Spinner />
        <LoadingText>{text}</LoadingText>
      </SpinnerOverlay>
  );
};

export default LoadingSpinner;
