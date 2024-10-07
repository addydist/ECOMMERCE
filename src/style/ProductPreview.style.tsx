import styled from "styled-components";

export const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 45px;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  color: #0D2E52;
  font-size: 16px;
  margin-bottom: 20px;
`;

export const ProductContainer = styled.div`
  display: flex;
  gap: 40px;
`;

export const ImageContainer = styled.div`
  flex: 1;
`;

export const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

export const ProductInfo = styled.div`
  flex: 1;
`;

export const ProductTitle = styled.h1`
  font-size: 28px;
  margin-bottom: 10px;
`;

export const ProductDescription = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
`;

export const ProductPrice = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const AddToCartButton = styled.button<{ disabled: boolean }>`
  background-color: ${props => props.disabled ? '#ccc' : '#0D2E52'};
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 18px;
  border-radius: 4px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${props => props.disabled ? '#ccc' : '#0056b3'};
  }
`;

export const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

export const QuantityButton = styled.button`
  background-color: #f0f0f0;
  border: none;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
  border-radius: 4px;

  &:hover {
    background-color: #e0e0e0;
  }
`;

export const QuantityDisplay = styled.span`
  font-size: 18px;
`;

export const ProductMeta = styled.div`
  margin-top: 20px;
  font-size: 16px;
  color: #666;
`;

export const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 10px;
`;

export const ReviewsContainer = styled.div`
  margin-top: 30px;
`;

export const ReviewItem = styled.div`
  border-bottom: 1px solid #eee;
  padding: 20px 0;
  font-size: 16px;
`;
export const StockWarning = styled.p`
  font-size: 16px;
  color: #E01E29;
  font-weight: bold;
  margin-top: 10px;
`;

