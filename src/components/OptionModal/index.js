import React from "react";
import { StatusBar } from "react-native";

import {
  Container,
  ModalOptions,
  HeaderModal,
  Filename,
  Content,
  ButtonPlay,
  ButtonPlayText,
  ButtonCloseModal,
  ModalBG,
} from "./styles";

export function OptionModal({ visible, onClose, options, currentItem }) {
  const { filename } = currentItem;

  return (
    <Container>
      <StatusBar hidden={false} />
      <ModalOptions animationType="slide" transparent={true} visible={visible}>
        <HeaderModal>
          <Filename numberOfLines={2}>{filename}</Filename>
          <Content>
            {options.map((option) => {
              return (
                <ButtonPlay key={option.title} onPress={option.onPress}>
                  <ButtonPlayText>{option.title}</ButtonPlayText>
                </ButtonPlay>
              );
            })}
          </Content>
        </HeaderModal>
        <ButtonCloseModal onPress={onClose}>
          <ModalBG />
        </ButtonCloseModal>
      </ModalOptions>
    </Container>
  );
}
