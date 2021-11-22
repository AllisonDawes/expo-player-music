import styled from "styled-components/native";
import { Entypo } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

import theme from "../../global/theme";

export const Container = styled.View`
  width: 100%;
  height: ${RFValue(85)}px;
  flex-direction: row;
  padding: 0 20px;
  align-items: center;
`;

export const ContainerLeft = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  width: 85%;

  flex-direction: row;
  align-items: center;
`;

export const Thumbnail = styled.View`
  width: ${RFValue(60)}px;
  height: ${RFValue(60)}px;
  background: ${theme.colors.secundary};
  border-radius: 10px;

  align-items: center;
  justify-content: center;
`;

export const ThumbnailText = styled.Text`
  font-family: ${theme.fonts.medium};
  color: ${theme.colors.shape};
  font-size: ${RFValue(28)}px;
`;

export const ContainerTitle = styled.View`
  width: 65%;
  margin-left: 20px;
`;

export const Title = styled.Text`
  font-family: ${theme.fonts.bold};
  color: ${theme.colors.shape};
  font-size: ${RFValue(16)}px;
`;

export const Author = styled.Text`
  font-family: ${theme.fonts.medium};
  color: ${theme.colors.text};
  font-size: ${RFValue(10)}px;
`;

export const ContainerRight = styled.View`
  height: 100%;
  width: 20%;
  justify-content: center;
`;

export const ButtonOptions = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})``;

export const IconOptions = styled(Entypo)`
  font-size: ${RFValue(20)}px;

  align-self: center;
`;
