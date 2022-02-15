import React from "react";

import logo from "../../assets/logo-dwsplayer2.png";

import { Container, LogoImage, TitleHeader } from "./styles";

export function Header({ title }) {
  return (
    <Container>
      <LogoImage source={logo} />
      <TitleHeader>{title}</TitleHeader>
    </Container>
  );
}
