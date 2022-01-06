import React, { useState } from "react";
import { Modal } from "react-native";

import {
  ContainerModal,
  InputContainer,
  Title,
  TextInputModal,
  Icon,
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
            value={playListName}
            onChangeText={(text) => setPlayListName(text)}
          />

          <Icon name="check" onPress={handleOnSubmit} />
        </InputContainer>
      </ContainerModal>

      <ButtonCloseModal onPress={onClose}>
        <ContainerButtonCloseModal />
      </ButtonCloseModal>
    </Modal>
  );
}
