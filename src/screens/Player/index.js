import React, { useContext, useEffect, useState, useRef } from "react";
import { Dimensions, Animated, SafeAreaView } from "react-native";
import Slider from "@react-native-community/slider";

import logo from "../../assets/image-music-player.png";

import { convertTime } from "../../global/helper";

import { PlayerButton } from "../../components/PlayerButton";

import { AudioContext } from "../../context/AudioProvider";

import {
  selectAudio,
  changeAudio,
  pause,
  moveAudio,
} from "../../global/audioController";

import {
  BackgroundScreen,
  ContainerInfoHeader,
  ContainerTitlePlayList,
  TitlePlayList,
  Container,
  AudioCountText,
  ContainerTitle,
  Title,
  ContainerTimer,
  Timer,
  ContainerButtonPlayer,
  ContainerPlay,
} from "./styles";
import theme from "../../global/theme";

export function Player() {
  const { width } = Dimensions.get("window");

  const scrollX = useRef(new Animated.Value(0)).current;

  const context = useContext(AudioContext);

  const { playbackPosition, playbackDuration, currentAudio, audioFiles } =
    context;

  const [currentPosition, setCurrentPosition] = useState(0);
  const [songIndex, setSongIndex] = useState(0);
  const [playSpacing, setPlaySpacing] = useState(true);

  const position = useRef(Animated.divide(scrollX, width)).current;

  const calculatorSeebBar = () => {
    if (playbackPosition !== null && playbackDuration !== null) {
      return playbackPosition / playbackDuration;
    }

    if (currentAudio.lastPosition) {
      return currentPosition / (currentAudio.duration * 1000);
    }

    return 0;
  };

  const handlePlayPause = async () => {
    await selectAudio(context.currentAudio, context);
  };

  const handlePrevious = async () => {
    await changeAudio(context, "previous");
  };

  const handleNext = async () => {
    await changeAudio(context, "next");
  };

  const renderCurrentTime = () => {
    if (context.soundObj && currentAudio.lastPosition) {
      return convertTime(currentAudio.lastPosition / 1000);
    }

    return convertTime(context.playbackPosition / 1000);
  };

  useEffect(() => {
    context.loadPreviousAudio();

    scrollX.addListener(({ value }) => {
      const val = Math.round(value / width);

      setSongIndex(val);
    });

    return () => {
      scrollX.removeAllListeners();
    };
  }, [scrollX]);

  const renderItem = ({ index }) => {
    return (
      <Animated.View
        style={{
          alignItems: "center",
          width: width,
          transform: [
            {
              translateX: Animated.multiply(Animated.add(position, -index), 0),
            },
          ],
        }}
      >
        <Animated.Image
          source={logo}
          style={{ width: 320, height: 320, borderRadius: 10 }}
        />
      </Animated.View>
    );
  };

  if (!context.currentAudio) return null;

  return (
    <BackgroundScreen>
      <ContainerInfoHeader>
        <AudioCountText>{`${context.currentAudioIndex + 1}/${
          context.totalAudioCount
        }`}</AudioCountText>

        <ContainerTitlePlayList>
          {context.isPlayListRunning && (
            <TitlePlayList>
              Playlist: {context.activePlayList.title}
            </TitlePlayList>
          )}
        </ContainerTitlePlayList>
      </ContainerInfoHeader>

      <Container>
        <SafeAreaView style={{ height: 320 }}>
          <Animated.FlatList
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            data={audioFiles}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            onScroll={() => {
              Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: true }
              );
            }}
          />
        </SafeAreaView>

        <ContainerTitle>
          <Title numberOfLines={1}>{context.currentAudio.filename}</Title>
        </ContainerTitle>

        <Slider
          style={{ width: width - 60, height: 40, marginTop: 5 }}
          minimumValue={0}
          maximumValue={1}
          value={calculatorSeebBar()}
          minimumTrackTintColor="#ccc"
          maximumTrackTintColor="#000"
          onValueChange={(value) => {
            setCurrentPosition(
              convertTime(value * context.currentAudio.duration)
            );
          }}
          onSlidingStart={async () => {
            if (!context.isPLaying) return;

            try {
              await pause(context.playbackObj);
            } catch (err) {
              console.log("error inside onSlidingStart callback", err);
            }
          }}
          onSlidingComplete={async (value) => {
            await moveAudio(context, value);
            setCurrentPosition(0);
          }}
        />

        <ContainerTimer>
          <Timer>{convertTime(context.currentAudio.duration)}</Timer>
          <Timer>
            {currentPosition ? currentPosition : renderCurrentTime()}
          </Timer>
        </ContainerTimer>

        <ContainerButtonPlayer>
          <PlayerButton
            iconType="PREV"
            size={34}
            iconColor={theme.colors.primary_medium}
            onPress={handlePrevious}
          />

          <PlayerButton
            onPress={handlePlayPause}
            iconType={context.isPlaying ? "PLAY" : "PAUSE"}
            iconColor={theme.colors.primary_light}
            size={100}
          />

          <PlayerButton
            iconType="NEXT"
            size={34}
            iconColor={theme.colors.primary_medium}
            onPress={handleNext}
          />
        </ContainerButtonPlayer>
      </Container>
    </BackgroundScreen>
  );
}

/**
 * Carroucel em tela
 * está faltando adicionar as funcionalidades
 * de mudar musica ao mover o carroucel, e
 * movimentar o carroucel ao mudar a musica pelo botão.
 */
