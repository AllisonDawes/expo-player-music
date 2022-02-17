import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import theme from "../../global/theme";
import { Background } from "../../components/Background";

export const BackgroundScreen = styled(Background)``;

export const Container = styled.View`
  padding: 20px;
`;

export const ButtonNewPlayList = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  flex-direction: row;
  background: ${theme.colors.secundary};
  padding: 10px;
  border-radius: 5px;

  margin-top: 15px;
  margin-bottom: 10px;

  align-items: center;
`;

export const ContainerLeftAddPlaylist = styled.View`
  background: ${theme.colors.secundary_medium};
  height: ${RFValue(50)}px;
  width: ${RFValue(50)}px;
  border-radius: 5px;

  align-items: center;
  justify-content: center;
`;

export const TextNewPlayList = styled.Text`
  font-family: ${theme.fonts.bold};
  color: ${theme.colors.shape};
  letter-spacing: 1px;

  margin-left: ${RFValue(15)}px;
`;

export const ButtonPlayList = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  padding: 10px;
  background: ${theme.colors.secundary};
  border-radius: 5px;

  margin-bottom: 10px;
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

  margin-top: 5px;
  opacity: 0.5;
`;
