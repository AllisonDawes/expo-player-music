import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import theme from "../../global/theme";

export const Container = styled.View`
  flex: 1;
  background: ${theme.colors.secundary_medium};

  padding: 20px 10px;
`;

export const Title = styled.Text`
  text-align: center;
  font-size: ${RFValue(18)}px;
  font-family: ${theme.fonts.bold};
  color: ${theme.colors.primary_medium};
  margin-bottom: 10px;
`;

export const ListContainer = styled.View`
  flex: 1;

  margin-top: ${RFValue(30)}px;
`;

export const NoMusiclistText = styled.Text`
  font-family: ${theme.fonts.bold};
  font-size: ${RFValue(22)}px;
  color: ${theme.colors.secundary_light};

  align-self: center;
`;
