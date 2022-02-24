import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

import theme from "../../global/theme";

export const Container = styled.View`
  flex: 1;
  background: ${theme.colors.secundary_medium};
`;

export const ContainerHeaderPlaylist = styled.View`
  width: 100%;
  padding: 20px 30px;
  background: ${theme.colors.secundary};

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ButtonDeletePlaylist = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})``;

export const IconButtonDelete = styled(Feather)`
  font-size: ${RFValue(22)}px;
  color: ${theme.colors.attention_light};
`;

export const Title = styled.Text`
  text-align: center;
  font-size: ${RFValue(18)}px;
  font-family: ${theme.fonts.bold};
  color: ${theme.colors.primary_medium};
`;

export const ListContainer = styled.View`
  flex: 1;
`;

export const NoMusiclistText = styled.Text`
  font-family: ${theme.fonts.bold};
  font-size: ${RFValue(22)}px;
  color: ${theme.colors.secundary_light};

  align-self: center;
`;

export const ButtonToPlayList = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: 80%;
  background: ${theme.colors.secundary};
  padding: 16px 10px;
  border-radius: 5px;
  margin-top: 30px;

  justify-content: center;
  align-self: center;
`;

export const TextToPlayList = styled.Text`
  font-family: ${theme.fonts.medium};
  font-size: ${RFValue(14)}px;
  color: ${theme.colors.secundary_light};

  align-self: center;
`;

export const IconToPlayList = styled(Feather)`
  font-size: ${RFValue(14)}px;
  color: ${theme.colors.secundary_light};
  align-self: center;

  margin-top: 5px;
`;
