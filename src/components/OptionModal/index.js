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
  options,
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
            {options.map((option) => {
              return (
                <ButtonPlay key={option.title} onPress={option.onPress}>
                  <ButtonPlayText>{option.title}</ButtonPlayText>
                </ButtonPlay>
              );
            })}

            {/*<ButtonPlay onPress={onPlayPress}>
              <ButtonPlayText>Play</ButtonPlayText>
            </ButtonPlay>

            <ButtonAddPlayList onPress={onPlayListPress}>
              <ButtonAddPlayListText>Add to PlayList</ButtonAddPlayListText>
            </ButtonAddPlayList>*/}
          </Content>
        </HeaderModal>
        <ButtonCloseModal onPress={onClose}>
          <ModalBG />
        </ButtonCloseModal>
      </ModalOptions>
    </Container>
  );
}
