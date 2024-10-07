import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartIcon from './CartIcon';
import CartSlider from './CartSlider';
import SearchBar from './SearchBar';
import {
  HeaderContainer,
  Logo,
  HeaderWrapper
} from '../style/Header.style';
import logo from '../assets/logo.svg';

interface HeaderProps {
  showCartIcon?: boolean;
  showSearch?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showCartIcon = true, showSearch = true }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <>
      <HeaderWrapper>
        <HeaderContainer>
          <Logo onClick={() => navigate('/')}>
            <img src={logo} alt='logo' />
          </Logo>

          {showSearch && <SearchBar />}
          {showCartIcon && <CartIcon onClick={toggleCart} />}
        </HeaderContainer>
      </HeaderWrapper>
      <CartSlider isOpen={isCartOpen} onClose={toggleCart} />
    </>
  );
};

export default Header;