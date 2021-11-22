import styled from "styled-components/native";

import { Background } from "../../components/Background";

import theme from "../../global/theme";

export const BackgroundScreen = styled(Background)``;

export const Container = styled.View`
  flex: 1;
`;

export const Separator = styled.View`
  height: 1px;
  width: 88%;
  background: ${theme.colors.primary_lightRGBA};

  align-self: center;
`;
