import styled from "styled-components";
import { ButtonA } from "../../css/DesignPatterns/ButtonA";
export const DropdownCircle = styled.div`
  ${ButtonA}
  position: fixed;
  top: 1.5em;
  right: 1.5em;
  // font-size controls the entire button size thanks to em
  font-size: 1rem;
`;