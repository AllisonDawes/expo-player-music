import React, { useContext } from "react";
import { FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";

import { AudioListItem } from "../../components/AudioListItem";

import { AudioContext } from "../../context/AudioProvider";
import { selectAudio } from "../../global/audioController";

import {
  Container,
  ButtonModalBG,
  ContainerModalBG,
  ListContainer,
  Title,
} from "./styles";

export function PlayListDetail(onClose) {
  const context = useContext(AudioContext);

  const route = useRoute();
  const playList = route.params;

  const playAudio = (audio) => {
    selectAudio(audio, context);
  };

  return (
    <>
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
                onAudioPress={() => playAudio(item)}
              />
            </ListContainer>
          )}
        />
      </Container>

      <ButtonModalBG onPress={onClose}>
        <ContainerModalBG />
      </ButtonModalBG>
    </>
  );
}

/**
 * Parei no video 30 aos 8:33
 */