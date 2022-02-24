import React, { Component } from "react";
import { Dimensions, ScrollView } from "react-native";
import { RecyclerListView, LayoutProvider } from "recyclerlistview";
import PropTypes from "prop-types";

import { AudioContext } from "../../context/AudioProvider";

import { selectAudio } from "../../global/audioController";

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

  handleAudioPress = async (audio) => {
    await selectAudio(audio, this.context);
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

  navigateToPlayList = () => {
    this.context.updateState(this.context, {
      addToPlayList: this.currentItem,
    });

    this.state.optionModalVisible = false;
    this.props.navigation.navigate("PlayList");
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
                    options={[
                      {
                        title: "Add to playlist",
                        onPress: this.navigateToPlayList,
                      },
                    ]}
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
