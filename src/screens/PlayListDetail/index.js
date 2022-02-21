import React, { useContext, useState } from "react";
import { FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AudioListItem } from "../../components/AudioListItem";
import { OptionModal } from "../../components/OptionModal";

import { AudioContext } from "../../context/AudioProvider";
import { selectAudio } from "../../global/audioController";

import { Container, ListContainer, Title } from "./styles";

export function PlayListDetail(onClose) {
  const context = useContext(AudioContext);

  const route = useRoute();
  const playList = route.params;

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [audios, setAudios] = useState(playList.audios);

  const playAudio = async (audio) => {
    await selectAudio(audio, context, {
      activePlayList: playList,
      isPlayListRunning: true,
    });
  };

  const closeModal = () => {
    setSelectedItem({});
    setModalVisible(false);
  };

  const removeAudio = async () => {
    const newAudios = audios.filter((audio) => audio.id !== selectedItem.id);

    const result = await AsyncStorage.getItem("playlist");

    if (result !== null) {
      const oldPlaylist = JSON.parse(result);
      const updatedPlayList = oldPlaylist.filter((item) => {
        if (item.id === playList.id) {
          item.audios = newAudios;
        }

        return item;
      });

      AsyncStorage.setItem("playlist", JSON.stringify(updatedPlayList));

      context.updateState(context, { playlist: updatedPlayList });
    }

    setAudios(newAudios);

    closeModal();
  };

  return (
    <>
      <Container>
        <Title>{playList.title}</Title>

        <FlatList
          data={audios}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ListContainer>
              <AudioListItem
                filename={item.filename}
                duration={item.duration}
                isPlaying={context.isPlaying}
                activeListItem={item.id === context.currentAudio.id}
                onAudioPress={() => playAudio(item)}
                onOptionPress={() => {
                  setSelectedItem(item);
                  setModalVisible(true);
                }}
              />
            </ListContainer>
          )}
        />
      </Container>

      <OptionModal
        visible={modalVisible}
        onClose={closeModal}
        options={[{ title: "Remove from playlist", onPress: removeAudio }]}
        currentItem={selectedItem}
      />
    </>
  );
}

/**
 * parei no video 33 aos 12:41
 */
