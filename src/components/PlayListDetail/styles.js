import styled from "styled-components/native";
import { Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import theme from "../../global/theme";

const { width, height } = Dimensions.get("window");

export const Container = styled.View`
  position: absolute;
  background: ${theme.colors.secundary_medium};
  bottom: 0;
  align-self: center;
  padding: 20px;

  height: ${height - 150}px;
  width: ${width - 15}px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
`;

export const Title = styled.Text`
  text-align: center;
  font-size: ${RFValue(18)}px;
  font-family: ${theme.fonts.bold};
  color: ${theme.colors.primary_medium};
  margin-bottom: 10px;
`;

export const ListContainer = styled.View``;

export const ButtonModalBG = styled.TouchableWithoutFeedback``;

export const ContainerModalBG = styled.View`
  position: absolute;
  background: ${theme.colors.modal_bg};
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: -1;
`;
