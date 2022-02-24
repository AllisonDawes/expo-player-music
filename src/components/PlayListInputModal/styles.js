import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { AntDesign } from "@expo/vector-icons";

import theme from "../../global/theme";

export const Container = styled.View`
  flex: 1;
`;

export const ContainerModal = styled.View`
  flex: 1;

  align-items: center;
  justify-content: center;
`;

export const InputContainer = styled.View`
  width: 90%;
  height: ${RFValue(150)}px;
  border-radius: 10px;
  padding: 10px;
  background: ${theme.colors.secundary};
  z-index: 1000;

  justify-content: space-around;
  align-items: center;
`;

export const Title = styled.Text`
  font-family: ${theme.fonts.bold};
  font-size: ${RFValue(14)}px;
  color: ${theme.colors.primary_medium};
`;

export const TextInputModal = styled.TextInput`
  width: 90%;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.primary_medium};
  font-size: ${RFValue(16)}px;
  font-family: ${theme.fonts.medium};
  color: ${theme.colors.text};
  padding: 0 5px;
  margin-bottom: 15px;
`;

export const ButtonCreatePlalist = styled.TouchableOpacity`
  width: 90%;
  background: ${theme.colors.primary};
  border-radius: 4px;
  padding: 10px;

  align-items: center;
  justify-content: center;
`;

export const TitleButton = styled.Text`
  font-family: ${theme.fonts.bold};
  font-size: ${RFValue(16)}px;
  color: ${theme.colors.shape};
`;

export const ButtonCloseModal = styled.TouchableWithoutFeedback``;

export const ContainerButtonCloseModal = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: ${theme.colors.modal_bg};
`;
