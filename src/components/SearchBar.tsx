import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import {
  SearchContainer,
  SearchInput,
  SearchButton,
} from '../style/Search.style';

interface SearchComponentProps {
  onSearch?: (query: string) => void;
}

const SearchBar: React.FC<SearchComponentProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      if (onSearch) {
        onSearch(searchQuery);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <SearchButton onClick={handleSearch}>
        <Search size={20} />
      </SearchButton>
    </SearchContainer>
  );
};

export default SearchBar;