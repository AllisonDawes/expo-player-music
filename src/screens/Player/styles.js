import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import { Background } from "../../components/Background";

import theme from "../../global/theme";

export const BackgroundScreen = styled(Background)``;

export const ContainerInfoHeader = styled.View`
  width: 80%;
  margin: ${RFValue(30)}px 0 ${RFValue(10)}px;

  align-self: center;
`;

export const AudioCountText = styled.Text`
  font-family: ${theme.fonts.regular};
  font-size: ${RFValue(12)}px;
  color: ${theme.colors.primary_light};
`;

export const ContainerTitlePlayList = styled.View``;

export const TitlePlayList = styled.Text`
  font-family: ${theme.fonts.bold};
  font-size: ${RFValue(14)}px;
  color: ${theme.colors.primary_light};
  margin-top: ${RFValue(5)}px;

  align-self: flex-start;
`;

export const Container = styled.View`
  padding: 0 0px 0;
  padding-top: ${RFValue(10)}px;
  max-height: ${RFValue(500)}px;

  align-items: center;
`;

export const ContainerTitle = styled.View`
  margin-top: ${RFValue(20)}px;
`;

export const Title = styled.Text`
  font-family: ${theme.fonts.bold};
  color: ${theme.colors.shape};
  font-size: ${RFValue(16)}px;

  margin-bottom: ${RFValue(10)}px;
`;

export const ContainerTimer = styled.View`
  width: 100%;
  padding: 0px 45px;

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
  padding: 5px 40px;

  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

export const ContainerPlay = styled.View`
  height: 100px;
  width: 100px;
  background: ${theme.colors.secundary_medium};

  border-radius: 50px;

  align-items: center;
  justify-content: center;
`;
