import styled from 'styled-components';

export const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const SearchInput = styled.input`
  width: 200px;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
`;

export const SearchButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: -30px;
`;

export const SearchResults = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-top: none;
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
`;

export const SearchResultItem = styled.div`
  padding: 8px 12px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const NoResultsFound = styled.div`
  padding: 8px 12px;
  color: #666;
`;
export const NoResultsMessage = styled.p`
  font-size: 18px;
  color: #666;
  text-align: center;
  margin-top: 20px;
`;