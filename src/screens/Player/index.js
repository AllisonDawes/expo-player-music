import React from "react";

import {
  BackgroundScreen,
  Container,
  PhotoSound,
  Title,
  Author,
} from "./styles";

export function Player() {
  return (
    <BackgroundScreen>
      <Container>
        <PhotoSound></PhotoSound>

        <Title>Every Breath You Take</Title>
        <Author>The Police</Author>
      </Container>
    </BackgroundScreen>
  );
}
