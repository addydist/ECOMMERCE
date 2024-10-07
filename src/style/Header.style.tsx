import styled from 'styled-components';

export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #547596;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  z-index: 1000;
`;

export const Logo = styled.div`
  cursor: pointer;
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #f0f0f0;
  border-radius: 20px;
  padding: 5px 15px;
`;

export const SearchInput = styled.input`
  border: none;
  background-color: transparent;
  padding: 5px;
  font-size: 16px;
  width: 200px;
  &:focus {
    outline: none;
  }
`;

export const SearchButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const HeaderWrapper = styled.div`
  height: 50px; 
`;