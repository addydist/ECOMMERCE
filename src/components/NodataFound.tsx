import React from "react";

import {
  NoDataContainer,
  BirdIcon,
  Message,
  SearchTerm,
} from "../style/Nodatafound.style";

interface NoDataFoundProps {
  searchTerm: string;
}

const NoDataFound: React.FC<NoDataFoundProps> = ({ searchTerm }) => {
  return (
    <NoDataContainer>
      <BirdIcon />
      <Message>
        No data found for <SearchTerm>"{searchTerm}"</SearchTerm>
      </Message>
    </NoDataContainer>
  );
};

export default NoDataFound;
