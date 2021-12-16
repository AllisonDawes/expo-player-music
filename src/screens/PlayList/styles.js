import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import theme from "../../global/theme";
import { Background } from "../../components/Background";

export const BackgroundScreen = styled(Background)``;

export const Container = styled.View`
  padding: 20px;
`;

export const ButtonPlayList = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  padding: 10px;
  background: ${theme.colors.secundary};
  border-radius: 5px;
`;

export const MyFavorite = styled.Text`
  font-family: ${theme.fonts.medium};
  font-size: ${RFValue(16)}px;
  color: ${theme.colors.shape};
`;

export const NumberSongs = styled.Text`
  font-family: ${theme.fonts.medium};
  font-size: ${RFValue(14)}px;
  color: ${theme.colors.shape};

  margin-top: 3px;
  opacity: 0.5;
`;

export const ButtonNewPlayList = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  margin-top: 15px;
`;

export const TextNewPlayList = styled.Text`
  font-family: ${theme.fonts.bold};
  color: ${theme.colors.shape};
  letter-spacing: 1px;
`;
