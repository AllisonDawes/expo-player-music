import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import theme from "../../global/theme";

export const Container = styled.View`
  width: 100%;
  height: ${RFValue(120)}px;
  background: ${theme.colors.secundary};

  padding: 20px;
  justify-content: space-between;
`;

export const LogoImage = styled.Image`
  width: ${RFValue(50)}px;
  height: ${RFValue(50)}px;
`;

export const TitleHeader = styled.Text`
  font-family: ${theme.fonts.bold};
  font-size: ${RFValue(14)}px;
  color: ${theme.colors.shape};

  align-self: center;
`;
