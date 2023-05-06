import { useEffect } from "react";
import { Title, BigContainer, HomeLink } from "./StyledLandingPage";


const Landing = () => {
  useEffect(()=>{},[])
  return (
    <BigContainer>
      <Title>PI Pokémon</Title>
      <HomeLink to="/home">EXPLORE</HomeLink>
    </BigContainer>
  );
};

export default Landing;