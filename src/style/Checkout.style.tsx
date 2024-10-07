import styled from 'styled-components';

export const CheckoutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const CheckoutForms = styled.div`
  flex: 1;
  min-width: 300px;
`;

export const BackLink = styled.a`
  display: inline-flex;
  align-items: center;
  color: #568FD1;
  text-decoration: none;
  margin-bottom: 1rem;
  font-size: 0.875rem;

  &:hover {
    color: #2d3748;
  }

  svg {
    margin-right: 0.5rem;
  }
`;

export const Section = styled.div`
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  margin-bottom: 1.5rem;
  overflow: hidden;
`;

export const SectionHeader = styled.div<{ isActive: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: ${props => props.isActive ? '#568FD1' : '#ffffff'};
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #f7fafc;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0;
`;

export const SectionContent = styled.div<{ isOpen: boolean }>`
  padding: ${props => props.isOpen ? '1.5rem' : '0'};
  max-height: ${props => props.isOpen ? '1000px' : '0'};
  overflow: hidden;
  transition: all 0.3s ease-in-out;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  padding:0.2rem;
`;

export const Label = styled.label`
  font-size: 0.975rem;
  font-weight: 500;
  color: #4a5568;
  margin-bottom: 0.5rem;
`;

export const Input = styled.input`
  width: 97%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  transition: border-color 0.2s ease-in-out;

  &:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  background-color: #ffffff;
  transition: border-color 0.2s ease-in-out;

  &:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
  }
`;

export const Button = styled.button`
  background-color: #4299e1;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #3182ce;
  }

  &:disabled {
    background-color: #a0aec0;
    cursor: not-allowed;
  }
`;

export const OrderSummary = styled.div`
  flex: 0 0 300px;
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
  align-self: flex-start;
  position: sticky;
  top: 2rem;

  @media (max-width: 768px) {
    flex: 1;
    position: static;
  }
`;

export const SummaryTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0 0 1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.975rem;
  color: #4a5568;
`;

export const Total = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
  font-weight: 600;
  font-size: 1.25rem;
  color: #2d3748;
`;

export const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding:0.2rem;
`;

export const RadioButton = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  

  input[type="radio"] {
    appearance: none;
    width: 1rem;
    height: 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 50%;
    outline: none;
    transition: border-color 0.2s ease-in-out;

    &:checked {
      border-color: #4299e1;
      background-color: #4299e1;
      box-shadow: inset 0 0 0 3px #ffffff;
    }
  }

  label {
    
    margin: 0.2rem;
    font-size: 0.92rem;
    color: #4a5568;
  }
`;

export const ErrorMessage = styled.p`
  color: #e53e3e;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

export const SuccessMessage = styled.p`
  color: #38a169;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;
export const HeaderWrapper = styled.div`
  height: 50px; 
`;