import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import theme from "../../global/theme";

export const Container = styled.View`
  background: ${theme.colors.secundary_medium};
  align-self: center;
  padding: 20px 10px;
`;

export const Title = styled.Text`
  text-align: center;
  font-size: ${RFValue(18)}px;
  font-family: ${theme.fonts.bold};
  color: ${theme.colors.primary_medium};
  margin-bottom: 10px;
`;

export const ListContainer = styled.View``;
