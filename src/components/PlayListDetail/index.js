import React from "react";
import { Modal, FlatList } from "react-native";

import { AudioListItem } from "../../components/AudioListItem";

import {
  Container,
  ButtonModalBG,
  ContainerModalBG,
  ListContainer,
  Title,
} from "./styles";

export function PlayListDetail({ visible, playList, onClose }) {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <Container>
        <Title>{playList.title}</Title>

        <FlatList
          data={playList.audios}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ListContainer>
              <AudioListItem
                filename={item.filename}
                duration={item.duration}
              />
            </ListContainer>
          )}
        />
      </Container>

      <ButtonModalBG onPress={onClose}>
        <ContainerModalBG />
      </ButtonModalBG>
    </Modal>
  );
}
