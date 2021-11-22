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
  ButtonAddPlayList,
  ButtonAddPlayListText,
  ButtonCloseModal,
  ModalBG,
} from "./styles";

export function OptionModal({
  visible,
  onClose,
  currentItem,
  onPlayPress,
  onPlayListPress,
}) {
  const { filename } = currentItem;

  return (
    <Container>
      <StatusBar hidden={false} />
      <ModalOptions animationType="slide" transparent={true} visible={visible}>
        <HeaderModal>
          <Filename numberOfLines={2}>{filename}</Filename>
          <Content>
            <ButtonPlay onPress={onPlayPress}>
              <ButtonPlayText>Play</ButtonPlayText>
            </ButtonPlay>

            <ButtonAddPlayList onPress={onPlayListPress}>
              <ButtonAddPlayListText>Add to PlayList</ButtonAddPlayListText>
            </ButtonAddPlayList>
          </Content>
        </HeaderModal>
        <ButtonCloseModal onPress={onClose}>
          <ModalBG />
        </ButtonCloseModal>
      </ModalOptions>
    </Container>
  );
}
