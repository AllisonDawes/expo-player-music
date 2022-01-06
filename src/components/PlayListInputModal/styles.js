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
  width: 80%;
  height: ${RFValue(150)}px;
  border-radius: 10px;
  padding: 10px 0;
  background: ${theme.colors.shape};
  z-index: 1000;

  justify-content: space-around;
  align-items: center;
`;

export const Title = styled.Text`
  font-family: ${theme.fonts.medium};
  font-size: ${RFValue(14)}px;
  color: ${theme.colors.secundary_light};
`;

export const TextInputModal = styled.TextInput`
  width: 80%;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.primary_medium};
  font-size: ${RFValue(16)}px;
  font-family: ${theme.fonts.medium};
  padding: 0 5px;
`;

export const Icon = styled(AntDesign)`
  font-size: ${RFValue(24)}px;
  padding: 10px 0 0;
  color: ${theme.colors.primary};
  border-radius: 50px;
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
