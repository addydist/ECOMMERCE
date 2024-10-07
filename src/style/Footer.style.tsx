import styled from 'styled-components';
import { Link } from 'react-router-dom';
export const FooterContainer = styled.footer`
  background-color: #547596;
  color: #e2e8f0;
  padding: 1.5rem 0;
`;

export const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  color:#0D2E52;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 2.4 rem;
  padding: 0 1rem;
`;

export const FooterSection = styled.div`
  flex: 1;
  min-width: 200px;
`;

export const FooterTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #0D2E52;
`;

export const FooterLink = styled(Link)`
  color: #0D2E52;
  text-decoration: none;
  display: block;
  margin-bottom: 0.5rem;
  
  &:hover {
    color: #ffffff;
  }
`;

export const FooterText = styled.p`
  margin-bottom: 0.5rem;
`;

export const SocialLink = styled.a`
  color: #0D2E52;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  margin-right: 1rem;
  
  &:hover {
    color: #ffffff;
  }
`;

export const Copyright = styled.div`
  text-align: center;
  color:#0D2E52;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #4a5568;
`;
