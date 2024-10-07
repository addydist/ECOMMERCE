import styled from "styled-components";
import { Bird } from "lucide-react";
export const NoDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
  background-color: #FFFFFF; 
`;

export const BirdIcon = styled(Bird)`
  width: 220px;
  height: 220px;
  color: #464343; 
`;

export const Message = styled.p`
  margin-top: 20px;
  font-size: 20px;
  color: #464343;
  text-align: center;
`;

export const SearchTerm = styled.span`
  color: #F39C12; 
  font-weight: bold;
`;

