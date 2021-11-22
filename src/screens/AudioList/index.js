import React, { Component } from "react";
import { Dimensions, ScrollView } from "react-native";
import { RecyclerListView, LayoutProvider } from "recyclerlistview";
import PropTypes from "prop-types";
import { Audio } from "expo-av";

import { AudioContext } from "../../context/AudioProvider";

import { play, pause, resume, playNext } from "../../global/audioController";

import { AudioListItem } from "../../components/AudioListItem";
import { Screen } from "../../components/Screen";
import { Header } from "../../components/Header";
import { OptionModal } from "../../components/OptionModal";

import { BackgroundScreen, Container, Separator } from "./styles";

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

  handleAudioPress = async (audio) => {
    //Playing audio for the first time:
    const { playbackObj, soundObj, currentAudio, updateState } = this.context;

    if (soundObj === null) {
      const playbackObj = new Audio.Sound();

      const status = await play(playbackObj, audio.uri);

      return updateState(this.context, {
        currentAudio: audio,
        playbackObj: playbackObj,
        soundObj: status,
      });
    }

    //Select another audio for the first time:
    if (soundObj.isLoaded && currentAudio.id !== audio.id) {
      const status = await playNext(playbackObj, audio.uri);

      return updateState(this.context, {
        currentAudio: audio,
        soundObj: status,
      });
    }

    //Pause audio:
    if (soundObj.isLoaded && soundObj.isPlaying) {
      const status = await pause(playbackObj);

      return updateState(this.context, {
        soundObj: status,
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

  rowRenderer = (type, item) => {
    return (
      <>
        <AudioListItem
          filename={item.filename}
          duration={item.duration}
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
            {({ dataProvider }) => {
              return audioFiles.length > 0 ? (
                <Screen>
                  <RecyclerListView
                    externalScrollView={this.scrollViewWithHeader}
                    dataProvider={dataProvider}
                    layoutProvider={this.layoutProvider}
                    rowRenderer={this.rowRenderer}
                  />

                  <OptionModal
                    onPlayPress={() => console.log("Playing")}
                    onPlayListPress={() => console.log("Add PlayList")}
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
