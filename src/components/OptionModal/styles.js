import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import theme from "../../global/theme";

export const Container = styled.View``;

export const ModalOptions = styled.Modal``;

export const HeaderModal = styled.View`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  background: ${theme.colors.secundary};
  z-index: 1000;

  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
`;

export const Filename = styled.Text`
  font-family: ${theme.fonts.medium};
  font-size: ${RFValue(18)}px;
  color: ${theme.colors.shape};
  padding: 20px;
  padding-bottom: 0;
`;

export const Content = styled.View`
  padding: 20px;
`;

export const ButtonPlay = styled.TouchableWithoutFeedback``;

export const ButtonPlayText = styled.Text`
  font-family: ${theme.fonts.medium};
  font-size: ${RFValue(14)}px;
  color: ${theme.colors.text};
  padding: 20px 0;
  letter-spacing: 1px;
`;

export const ButtonAddPlayList = styled.TouchableWithoutFeedback``;

export const ButtonAddPlayListText = styled.Text`
  font-family: ${theme.fonts.medium};
  font-size: ${RFValue(14)}px;
  color: ${theme.colors.text};
  padding: 0 0 10px;
  letter-spacing: 1px;
`;

export const ButtonCloseModal = styled.TouchableWithoutFeedback``;

export const ModalBG = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: ${theme.colors.modal_bg};
`;
