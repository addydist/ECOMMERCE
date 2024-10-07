import styled, { keyframes } from 'styled-components'
import { Link } from "react-router-dom";
export const Navbar = styled.nav`
  background-color: #2c3e50;
  color: white;
  padding: 10px 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
`

export const Logo = styled.div`
    display: flex;
  align-items: center;
  padding: 10px;
  
  svg {
    width: 100px; 
    height: auto;
  }
`

export const CartIcon = styled.div`
  cursor: pointer;
  position: relative;
`

export const CartCount = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #e74c3c;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 0.8rem;
`

export const CartSidebar = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: ${props => props.isOpen ? '0' : '-300px'};
  width: 250px;
  height: 100vh;
  background-color: white;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  transition: right 0.3s ease;
  z-index: 1001;
  padding: 20px;
  overflow-y: auto;
`

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  margin-top: 80px;
`

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
`

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  
`
export const Error=styled.h1`
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "80vh",
  fontSize: "24px",
  color: "#333",
  `
export const ProductCard = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.3s ease;
  cursor: pointer;
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`

export const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`

export const ProductInfo = styled.div`
  padding: 15px;
  flex-grow: 1;
`

export const ProductTitle = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: #333;
`

export const ProductDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 10px;
`

export const ProductPrice = styled.span`
  font-size: 1.1rem;
  font-weight: bold;
  color: #2c3e50;
`

export const AddToCartButton = styled.button<{ disabled?: boolean }>`
  width: 100%;
  padding: 10px;
  background-color: ${props => props.disabled ? '#ccc' : '#0D2E52'};
  color: white;
  border: none;
  border-radius: 0 0 8px 8px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.disabled ? '#ccc' : '#0056b3'};
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`

export const PaginationButton = styled.button<{ active?: boolean }>`
  margin: 0 5px;
  padding: 5px 10px;
  border: 1px solid #3498db;
  background-color: ${props => props.active ? '#0D2E52' : 'white'};
  color: ${props => props.active ? 'white' : '#0D2E52'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #3498db;
    color: white;
  }
`

export const CartItems = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;
`

export const CartTotal = styled.div`
  margin-top: 20px;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: right;
`
export const CartItemInfo = styled.div`
  display: flex;
  flex-direction: column;
`
export const CartItemTitle = styled.span`
  font-weight: bold;
`

export const CartItemPrice = styled.span`
  color: #2c3e50;
`

export const CartItemControls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

export const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`

export const QuantityButton = styled.button`
  background-color: #f0f0f0;
  border: none;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e0e0e0;
  }
`

export const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #e74c3c;
  transition: color 0.3s ease;

  &:hover {
    color: #c0392b;
  }
`
export const NavbarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

export const CheckoutButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.text};
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.secondary};
  }
`


export const CheckoutContainer = styled.div`
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  gap: 40px;
  color: #333;
  background-color: #f5f5f5;
`;

export const CheckoutForms = styled.div`
  flex: 1;
`;

export const BackLink = styled.a`
  display: flex;
  align-items: center;
  color: #0D2E52;
  text-decoration: none;
  margin-bottom: 20px;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const Section = styled.div`
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
`;

export const SectionHeader = styled.div<{ isActive: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: ${props => props.isActive ? '#0D2E52' : '#f8f9fa'};
  color: ${props => props.isActive ? '#fff' : '#333'};
  cursor: pointer;
`;

export const SectionTitle = styled.h2`
  margin: 0;
  font-size: 1.2rem;
`;

export const SectionContent = styled.div<{ isOpen: boolean }>`
  padding: 20px;
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  margin-bottom: 4px;
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  color: #333;
`;

export const Select = styled.select`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  color: #333;
`;

export const Button = styled.button`
  padding: 10px 20px;
  background-color: #0D2E52;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #0056b3;
  }
`;

export const OrderSummary = styled.div`
  width: 300px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const SummaryTitle = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const Total = styled(SummaryItem)`
  font-weight: bold;
  margin-top: 20px;
  border-top: 1px solid #ddd;
  padding-top: 10px;
`;
export const ButtonLink = styled(Link)`
  display: inline-block;
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color:#0D2E52;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

export const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

export const CategoryCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const StockInfo = styled.div`
  font-size: 14px;
  color: #666;
  margin-top: 5px;
`;

export const OutOfStockOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  color: red;
`;

export const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const RadioButton = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const LoadingSpinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
  margin: 20px auto;
`;


export const NoResultsMessage = styled.p`
  font-size: 18px;
  color: #666;
  text-align: center;
  margin-top: 20px;
`;
