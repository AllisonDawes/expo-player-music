import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import { Background } from "../../components/Background";

import theme from "../../global/theme";

export const BackgroundScreen = styled(Background)``;

export const Container = styled.View`
  flex: 1;
  padding: 0 40px 0;
  padding-top: ${RFValue(80)}px;

  align-items: center;
`;

export const PhotoSound = styled.View`
  background: ${theme.colors.secundary};
  width: 100%;
  height: ${RFValue(310)}px;
  border-radius: 20px;

  margin-bottom: ${RFValue(30)}px;
`;

export const Title = styled.Text`
  font-family: ${theme.fonts.bold};
  color: ${theme.colors.shape};
  font-size: ${RFValue(16)}px;

  margin-bottom: ${RFValue(5)}px;
`;

export const Author = styled.Text`
  font-family: ${theme.fonts.medium};
  color: ${theme.colors.text};
  font-size: ${RFValue(14)}px;

  margin-bottom: ${RFValue(5)}px;
`;
