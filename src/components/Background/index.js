import React from "react";

import { Container, CuboBackground } from "./styles";

export function Background({ children }) {
  return (
    <Container colors={["#2DEFCF", "#2F3244"]} end={{ x: 1.0, y: 1.2 }}>
      <CuboBackground
        colors={["#3B3F51", "transparent"]}
        end={{ x: 1, y: 1 }}
      />

      {children}
    </Container>
  );
}
