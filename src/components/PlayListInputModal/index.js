import React, { useState } from "react";
import { Modal } from "react-native";

import theme from "../../global/theme";

import {
  ContainerModal,
  InputContainer,
  Title,
  TextInputModal,
  ButtonCreatePlalist,
  TitleButton,
  ButtonCloseModal,
  ContainerButtonCloseModal,
} from "./styles";

export function PlayListInputModal({ visible, onClose, onSubmit }) {
  const [playListName, setPlayListName] = useState("");

  const handleOnSubmit = () => {
    if (!playListName.trim()) {
      onClose();
    } else {
      onSubmit(playListName);
      setPlayListName("");
      onClose();
    }
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <ContainerModal>
        <InputContainer>
          <Title>Crie sua PlayList</Title>

          <TextInputModal
            autoCorrect={false}
            autoCapitalize="words"
            placeholder="Insira o nome da PlayList ..."
            placeholderTextColor="#999"
            value={playListName}
            onChangeText={(text) => setPlayListName(text)}
          />

          <ButtonCreatePlalist onPress={handleOnSubmit}>
            <TitleButton>Criar</TitleButton>
          </ButtonCreatePlalist>
        </InputContainer>
      </ContainerModal>

      <ButtonCloseModal onPress={onClose}>
        <ContainerButtonCloseModal />
      </ButtonCloseModal>
    </Modal>
  );
}
