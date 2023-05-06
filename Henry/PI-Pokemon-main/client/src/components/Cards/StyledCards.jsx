import styled from "styled-components";
import { WidgetA } from "../../css/DesignPatterns/WidgetA";

export const MainContainer = styled.div`
  margin-top: 6rem;
  width: 45rem;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5rem;
  padding: 2.5rem;
  ${WidgetA}
`;

export const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

export const LoadingText = styled.h2`
  text-align: center;
  padding: 0;
  font-family: Geometos;
`;

export const LoadingGIF = styled.img``;