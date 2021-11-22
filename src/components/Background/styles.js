import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from "expo-linear-gradient";

export const Container = styled(LinearGradient)`
  flex: 1;
`;

export const CuboBackground = styled(LinearGradient)`
  position: absolute;
  width: ${RFValue(300)}px;
  height: ${RFValue(350)}px;

  top: 0;
  left: 0;
`;
