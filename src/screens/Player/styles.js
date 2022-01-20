import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { MaterialIcons } from "@expo/vector-icons";

import { Background } from "../../components/Background";

import theme from "../../global/theme";

export const BackgroundScreen = styled(Background)``;

export const Container = styled.View`
  flex: 1;
  padding: 0 40px 0;
  padding-top: ${RFValue(80)}px;

  align-items: center;
`;

export const AudioCountText = styled.Text`
  position: absolute;
  left: ${RFValue(35)}px;
  top: 20px;

  font-family: ${theme.fonts.regular};
  font-size: ${RFValue(12)}px;
  color: ${theme.colors.primary_light};
`;

export const PhotoSound = styled.View`
  background: ${theme.colors.secundary};
  width: 100%;
  height: ${RFValue(310)}px;
  border-radius: 20px;

  margin-bottom: ${RFValue(30)}px;

  align-items: center;
  justify-content: center;
`;

export const IconPhotoSound = styled(MaterialIcons)`
  font-size: ${RFValue(180)}px;
  color: ${theme.colors.secundary_light};
`;

export const ContainerTitle = styled.View`
  height: ${RFValue(50)}px;
`;

export const Title = styled.Text`
  font-family: ${theme.fonts.bold};
  color: ${theme.colors.shape};
  font-size: ${RFValue(16)}px;

  margin-bottom: ${RFValue(15)}px;
`;

export const ContainerTimer = styled.View`
  width: 100%;
  padding: 0px 5px;

  flex-direction: row;
  justify-content: space-between;
`;

export const Timer = styled.Text`
  font-family: ${theme.fonts.regular};
  color: ${theme.colors.text};
  font-size: ${RFValue(12)}px;
`;

export const ContainerButtonPlayer = styled.View`
  width: 100%;
  margin-top: ${RFValue(5)}px;
  padding: 10px;

  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;
