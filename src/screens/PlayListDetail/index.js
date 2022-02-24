import React, { useContext, useState } from "react";
import { FlatList, View, Alert } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AudioListItem } from "../../components/AudioListItem";
import { OptionModal } from "../../components/OptionModal";

import { AudioContext } from "../../context/AudioProvider";
import { selectAudio } from "../../global/audioController";

import {
  Container,
  ListContainer,
  ContainerHeaderPlaylist,
  ButtonDeletePlaylist,
  IconButtonDelete,
  Title,
  NoMusiclistText,
  ButtonToPlayList,
  TextToPlayList,
  IconToPlayList,
} from "./styles";

export function PlayListDetail() {
  const context = useContext(AudioContext);
  const navigation = useNavigation();

  const route = useRoute();
  const playList = route.params;

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [audios, setAudios] = useState(playList.audios);

  const playAudio = async (props) => {
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
    let isPlaying = context.isPlaying;
    let isPlayListRunning = context.isPlayListRunning;
    let soundObj = context.soundObj;
    let playbackPosition = context.playbackPosition;
    let activePlayList = context.activePlayList;

    if (
      context.isPlayListRunning &&
      context.currentAudio.id === selectedItem.id
    ) {
      // stop
      await context.playbackObj.stopAsync();
      await context.playbackObj.unloadAsync();

      isPlaying = false;
      isPlayListRunning = false;
      soundObj = null;
      playbackPosition = 0;
      activePlayList = [];
    }

    const newAudios = audios.filter((audio) => audio.id !== selectedItem.id);

    const result = await AsyncStorage.getItem("playlist");

    if (result !== null) {
      const oldPlaylists = JSON.parse(result);
      const updatedPlayLists = oldPlaylists.filter((item) => {
        if (item.id === playList.id) {
          item.audios = newAudios;
        }

        return item;
      });

      AsyncStorage.setItem("playlist", JSON.stringify(updatedPlayLists));

      context.updateState(context, {
        playList: updatedPlayLists,
        isPlayListRunning,
        activePlayList,
        playbackPosition,
        isPlaying,
        soundObj,
      });
    }

    setAudios(newAudios);

    closeModal();
  };

  const removePlaylist = async () => {
    let isPlaying = context.isPlaying;
    let isPlayListRunning = context.isPlayListRunning;
    let soundObj = context.soundObj;
    let playbackPosition = context.playbackPosition;
    let activePlayList = context.activePlayList;

    if (context.isPlayListRunning && activePlayList.id === playList.id) {
      // stop
      await context.playbackObj.stopAsync();
      await context.playbackObj.unloadAsync();

      isPlaying = false;
      isPlayListRunning = false;
      soundObj = null;
      playbackPosition = 0;
      activePlayList = [];
    }

    const result = await AsyncStorage.getItem("playlist");

    if (result !== null) {
      const oldPlaylists = JSON.parse(result);
      const updatedPlayLists = oldPlaylists.filter(
        (item) => item.id !== playList.id
      );

      AsyncStorage.setItem("playlist", JSON.stringify(updatedPlayLists));

      context.updateState(context, {
        playList: updatedPlayLists,
        isPlayListRunning,
        activePlayList,
        playbackPosition,
        isPlaying,
        soundObj,
      });
    }

    navigation.goBack();
  };

  const confirmDeletePlaylist = () => {
    Alert.alert("Aviso!", "Deseja realmente deletar essa playlist?", [
      {
        text: "Cancelar",
        onPress: () => {},
      },
      {
        text: "Sim",
        onPress: () => removePlaylist(),
      },
    ]);
  };

  return (
    <>
      <Container>
        <ContainerHeaderPlaylist>
          <View />

          <Title>{playList.title}</Title>

          <ButtonDeletePlaylist onPress={confirmDeletePlaylist}>
            <IconButtonDelete name="trash-2" />
          </ButtonDeletePlaylist>
        </ContainerHeaderPlaylist>

        {audios.length ? (
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
        ) : (
          <ListContainer>
            <NoMusiclistText>Nenhuma</NoMusiclistText>
            <NoMusiclistText>música encontrada!</NoMusiclistText>

            <ButtonToPlayList onPress={() => navigation.navigate("AudioList")}>
              <TextToPlayList>Ir para lista de musicas</TextToPlayList>
              <IconToPlayList name="plus" />
            </ButtonToPlayList>
          </ListContainer>
        )}
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
