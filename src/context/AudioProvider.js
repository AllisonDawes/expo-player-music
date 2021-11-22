import React, { Component, createContext } from "react";
import { View, Text, Alert } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { DataProvider } from "recyclerlistview";

export const AudioContext = createContext();

class AudioProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audioFiles: [],
      permissionError: false,
      dataProvider: new DataProvider((r1, r2) => r1 !== r2),
      playbackObj: null,
      soundObj: null,
      currentAudio: {},
    };
  }

  permissionAlert = () => {
    Alert.alert(
      "Requer permissão",
      "Esta aplicação precisa ler os audio do seu dispositivo!",
      [
        { text: "Aceitar", onPress: () => this.getPermission() },
        { text: "Cancelar", onPress: () => this.permissionAlert() },
      ]
    );
  };

  getAudioFiles = async () => {
    const { dataProvider, audioFiles } = this.state;

    let media = await MediaLibrary.getAssetsAsync({
      mediaType: "audio",
    });

    media = await MediaLibrary.getAssetsAsync({
      mediaType: "audio",
      first: media.totalCount,
    });

    this.setState({
      ...this.state,
      dataProvider: dataProvider.cloneWithRows([
        ...audioFiles,
        ...media.assets,
      ]),
      audioFiles: [...audioFiles, ...media.assets],
    });
  };

  getPermission = async () => {
    /**
     * {
     *   "canAskAgain": true,
     *   "expires": "never",
     *   "granted": "false",
     *   "status": "undetermined"
     * }
     */

    const permission = await MediaLibrary.getPermissionsAsync();

    if (permission.granted) {
      //We want to get all the audio files
      this.getAudioFiles();
    }

    if (!permission.canAskAgain && !permission.granted) {
      this.setState({ ...this.state, permissionError: true });
    }

    if (!permission.granted && permission.canAskAgain) {
      const { status, canAskAgain } =
        await MediaLibrary.requestPermissionsAsync();

      if (status === "denied" && canAskAgain) {
        // we are going to display alert that user must allow this permission to work this app
        permissionAlert();
      }

      if (status === "granted") {
        // We want to get all the audio files
        this.getAudioFiles();
      }

      if (status === "denied" && !canAskAgain) {
        // we want to display some error to the user.
        this.setState({ ...this.state, permissionError: true });
      }
    }
  };

  componentDidMount() {
    this.getPermission();
  }

  updateState = (prevState, newState = {}) => {
    this.setState({ ...prevState, ...newState });
  };

  render() {
    const {
      audioFiles,
      dataProvider,
      permissionError,
      playbackObj,
      soundObj,
      currentAudio,
    } = this.state;

    if (permissionError)
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 25, textAlign: "center", color: "red" }}>
            Parece que você não aceitou a permissão
          </Text>
        </View>
      );

    return (
      <AudioContext.Provider
        value={{
          audioFiles,
          dataProvider,
          playbackObj,
          soundObj,
          currentAudio,
          updateState: this.updateState,
        }}
      >
        {this.props.children}
      </AudioContext.Provider>
    );
  }
}

export default AudioProvider;
