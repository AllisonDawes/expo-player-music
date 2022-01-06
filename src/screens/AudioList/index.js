import React, { Component } from "react";
import { Dimensions, ScrollView } from "react-native";
import { RecyclerListView, LayoutProvider } from "recyclerlistview";
import PropTypes from "prop-types";
import { Audio } from "expo-av";

import { AudioContext } from "../../context/AudioProvider";
import { storeAudioForNextOpening } from "../../global/helper";

import { play, pause, resume, playNext } from "../../global/audioController";

import { AudioListItem } from "../../components/AudioListItem";
import { Screen } from "../../components/Screen";
import { Header } from "../../components/Header";
import { OptionModal } from "../../components/OptionModal";

import { BackgroundScreen, Container } from "./styles";

export class AudioList extends Component {
  static contextType = AudioContext;

  constructor(props) {
    super(props);
    this.state = {
      optionModalVisible: false,
      loading: false,
    };

    this.currentItem = {};
  }

  layoutProvider = new LayoutProvider(
    (i) => "audio",
    (type, dim) => {
      dim.width = Dimensions.get("window").width;
      dim.height = 80;
    }
  );

  //onPlaybackStatusUpdate = async (playbackStatus) => {
  //  if (playbackStatus.isLoaded && playbackStatus.isPlaying) {
  //    this.context.updateState(this.context, {
  //      playbackPosition: playbackStatus.positionMillis,
  //      playbackDuration: playbackStatus.durationMillis,
  //    });
  //  }
  //
  //  // Play next audio after finalized current audio:
  //  if (playbackStatus.didJustFinish) {
  //    const nextAudioIndex = this.context.currentAudioIndex + 1;
  //
  //    if (nextAudioIndex >= this.context.totalAudioCount) {
  //      this.context.playbackObj.unloadAsync();
  //
  //      this.context.updateState(this.context, {
  //        soundObj: null,
  //        currentAudio: this.context.audioFiles[0],
  //        isPlaying: false,
  //        currentAudioIndex: 0,
  //        playbackPosition: null,
  //        playbackDuration: null,
  //      });
  //
  //      return storeAudioForNextOpening(this.context.audioFiles[0], 0);
  //    }
  //
  //    const audio = this.context.audioFiles[nextAudioIndex];
  //
  //    const status = await playNext(this.context.playbackObj, audio.uri);
  //
  //    this.context.updateState(this.context, {
  //      soundObj: status,
  //      currentAudio: audio,
  //      isPlaying: true,
  //      currentAudioIndex: nextAudioIndex,
  //    });
  //
  //    storeAudioForNextOpening(audio, nextAudioIndex);
  //  }
  //};

  handleAudioPress = async (audio) => {
    //Playing audio for the first time:
    const { playbackObj, soundObj, currentAudio, updateState, audioFiles } =
      this.context;

    if (soundObj === null) {
      const playbackObj = new Audio.Sound();

      const status = await play(playbackObj, audio.uri);

      const index = audioFiles.indexOf(audio);

      updateState(this.context, {
        currentAudio: audio,
        playbackObj: playbackObj,
        soundObj: status,
        isPlaying: true,
        currentAudioIndex: index,
      });

      playbackObj.setOnPlaybackStatusUpdate(
        this.context.onPlaybackStatusUpdate
      );

      return storeAudioForNextOpening(audio, index);
    }

    //Select another audio for the first time:
    if (soundObj.isLoaded && currentAudio.id !== audio.id) {
      const status = await playNext(playbackObj, audio.uri);

      const index = audioFiles.indexOf(audio);

      updateState(this.context, {
        currentAudio: audio,
        soundObj: status,
        isPlaying: true,
        currentAudioIndex: index,
      });

      return storeAudioForNextOpening(audio, index);
    }

    //Pause audio:
    if (soundObj.isLoaded && soundObj.isPlaying) {
      const status = await pause(playbackObj);

      return updateState(this.context, {
        soundObj: status,
        isPlaying: false,
      });
    }

    //resume audio:
    if (
      soundObj.isLoaded &&
      !soundObj.isPlaying &&
      currentAudio.id === audio.id
    ) {
      const status = await resume(playbackObj);

      return updateState(this.context, {
        soundObj: status,
        isPlaying: true,
      });
    }
  };

  scrollViewWithHeader = React.forwardRef(({ children, ...props }, ref) => {
    return (
      <ScrollView ref={ref} {...props}>
        <Header title="Lista de Musicas" />
        {children}
      </ScrollView>
    );
  });

  componentDidMount() {
    this.context.loadPreviousAudio();
  }

  rowRenderer = (type, item, index, extendedState) => {
    return (
      <>
        <AudioListItem
          filename={item.filename}
          duration={item.duration}
          isPlaying={extendedState.isPlaying}
          activeListItem={this.context.currentAudioIndex === index}
          onAudioPress={() => this.handleAudioPress(item)}
          onOptionPress={() => {
            this.currentItem = item;
            this.setState({ ...this.state, optionModalVisible: true });
          }}
        />
      </>
    );
  };

  render() {
    const { audioFiles } = this.context;

    return (
      <BackgroundScreen>
        <Container>
          <AudioContext.Consumer>
            {({ dataProvider, isPlaying }) => {
              return audioFiles.length > 0 ? (
                <Screen>
                  <RecyclerListView
                    externalScrollView={this.scrollViewWithHeader}
                    dataProvider={dataProvider}
                    layoutProvider={this.layoutProvider}
                    rowRenderer={this.rowRenderer}
                    extendedState={{ isPlaying }}
                  />

                  <OptionModal
                    onPlayPress={() => console.log("Playing")}
                    onPlayListPress={() => {
                      this.context.updateState(this.context, {
                        addToPlayList: this.currentItem,
                      });

                      this.setState({
                        ...this.state,
                        optionModalVisible: false,
                      });

                      this.props.navigation.navigate("PlayList");
                    }}
                    currentItem={this.currentItem}
                    visible={this.state.optionModalVisible}
                    onClose={() =>
                      this.setState({
                        ...this.state,
                        optionModalVisible: false,
                      })
                    }
                  />
                </Screen>
              ) : null;
            }}
          </AudioContext.Consumer>
        </Container>
      </BackgroundScreen>
    );
  }
}

RecyclerListView.propTypes.externalScrollView = PropTypes.object;
