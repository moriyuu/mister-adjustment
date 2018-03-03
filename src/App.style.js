import styled from "styled-components";
import StyleVariables from "./components/_styleVariables";

const AppStyledDiv = styled.div`
  .btn {
    background-color: ${StyleVariables.color.orange.light};
    border-color: ${StyleVariables.color.orange.light};
    &:active {
      background-color: ${StyleVariables.color.orange.veryDark} !important;
      border-color: ${StyleVariables.color.orange.light} !important;
    }
    &:focus {
      box-shadow: none !important;
    }
  }

  h1 {
    color: ${StyleVariables.color.orange.light} !important;
    font-weight: 800 !important;
  }

  .table-hover tbody tr:hover {
    background-color: ${StyleVariables.color.gray.light};
    cursor: pointer;
  }
`;

export default AppStyledDiv;