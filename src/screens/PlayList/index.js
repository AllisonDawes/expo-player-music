import React, { useContext, useEffect, useState } from "react";
import { Alert, FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { PlayListInputModal } from "../../components/PlayListInputModal";
import { PlayListDetail } from "../../components/PlayListDetail";

import { AudioContext } from "../../context/AudioProvider";

import {
  BackgroundScreen,
  Container,
  ButtonNewPlayList,
  ContainerLeftAddPlaylist,
  TextNewPlayList,
  ButtonPlayList,
  MyFavorite,
  NumberSongs,
} from "./styles";

let selectedPlayList = {};

export function PlayList({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [showPlayList, setShowPlayList] = useState(false);

  const context = useContext(AudioContext);
  const { playList, addToPlayList, updateState } = context;

  const createPlayList = async (playListName) => {
    const result = await AsyncStorage.getItem("playlist");

    if (result !== null) {
      const audios = [];

      if (addToPlayList) {
        audios.push(addToPlayList);
      }

      const newList = {
        id: Date.now(),
        title: playListName,
        audios,
      };

      const updatedList = [...playList, newList];
      updateState(context, { addToPlayList: null, playList: updatedList });

      await AsyncStorage.setItem("playlist", JSON.stringify(updatedList));
    }

    setModalVisible(false);
  };

  const renderPlayList = async () => {
    const result = await AsyncStorage.getItem("playlist");

    if (result === null) {
      const defaultPlayList = {
        id: Date.now(),
        title: "My favorite",
        audios: [],
      };

      const newPlayList = [...playList, defaultPlayList];

      updateState(context, { playList: [...newPlayList] });

      return await AsyncStorage.setItem(
        "playlist",
        JSON.stringify([...newPlayList])
      );
    }

    updateState(context, { playList: JSON.parse(result) });
  };

  const handleBannerPress = async (playList) => {
    // update playlist if there is any selected audio.
    if (addToPlayList) {
      const result = await AsyncStorage.getItem("playlist");

      let oldList = [];
      let updatedList = [];
      let sameAudio = false;

      if (result !== null) {
        oldList = JSON.parse(result);

        updatedList = oldList.filter((list) => {
          if (list.id === playList.id) {
            // we want to check is that same audio is already insideour list or not.
            for (let audio of list.audios) {
              if (audio.id === addToPlayList.id) {
                // alert with some message
                sameAudio = true;
                return;
              }
            }

            // otherwise update the playlist.
            list.audios = [...list.audios, addToPlayList];
          }

          return list;
        });
      }

      if (sameAudio) {
        Alert.alert(
          "Found same audio!",
          `${addToPlayList.filename} is already inside the list.`
        );

        sameAudio = false;

        return updateState(context, { addToPlayList: null });
      }

      updateState(context, { addToPlayList: null, playList: [...updatedList] });

      return AsyncStorage.setItem("playlist", JSON.stringify([...updatedList]));
    }

    // if there is no audio selected then we want open the list.
    selectedPlayList = playList;
    // setShowPlayList(true);
    navigation.navigate("PlayListDetail", playList);
  };

  useEffect(() => {
    if (!playList.length) {
      renderPlayList();
    }
  }, []);

  return (
    <>
      <BackgroundScreen>
        <Container>
          <ButtonNewPlayList onPress={() => setModalVisible(true)}>
            <ContainerLeftAddPlaylist>
              <Feather name="plus" size={26} color="#fff" />
            </ContainerLeftAddPlaylist>
            <TextNewPlayList>Add Nova PlayList</TextNewPlayList>
          </ButtonNewPlayList>

          {playList.length ? (
            <FlatList
              data={playList}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <ButtonPlayList onPress={() => handleBannerPress(item)}>
                  <MyFavorite>{item.title}</MyFavorite>
                  <NumberSongs>
                    {item.audios.length > 1
                      ? `${item.audios.length} Songs`
                      : `${item.audios.length} Song`}
                  </NumberSongs>
                </ButtonPlayList>
              )}
            />
          ) : null}

          <PlayListInputModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            onSubmit={(playListName) => createPlayList(playListName)}
          />
        </Container>
      </BackgroundScreen>

      <PlayListDetail
        visible={showPlayList}
        playList={selectedPlayList}
        onClose={() => setShowPlayList(false)}
      />
    </>
  );
}
