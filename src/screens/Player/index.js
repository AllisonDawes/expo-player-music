import React, { useContext, useEffect } from "react";
import { Dimensions } from "react-native";
import Slider from "@react-native-community/slider";

import { convertTime } from "../../global/helper";

import { PlayerButton } from "../../components/PlayerButton";

import { AudioContext } from "../../context/AudioProvider";
import { selectAudio, changeAudio } from "../../global/audioController";

import {
  BackgroundScreen,
  Container,
  AudioCountText,
  PhotoSound,
  IconPhotoSound,
  ContainerTitle,
  Title,
  ContainerTimer,
  Timer,
  ContainerButtonPlayer,
} from "./styles";

export function Player() {
  const { width } = Dimensions.get("window");

  const context = useContext(AudioContext);

  const { playbackPosition, playbackDuration } = context;

  const calculatorSeebBar = () => {
    if (playbackPosition !== null && playbackDuration !== null) {
      return playbackPosition / playbackDuration;
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
    return convertTime(context.playbackPosition / 1000);
  };

  useEffect(() => {
    context.loadPreviousAudio();
  }, []);

  if (!context.currentAudio) return null;

  return (
    <BackgroundScreen>
      <AudioCountText>{`${context.currentAudioIndex + 1}/${
        context.totalAudioCount
      }`}</AudioCountText>

      <Container>
        <PhotoSound>
          <IconPhotoSound name="library-music" />
        </PhotoSound>

        <ContainerTitle>
          <Title numberOfLines={1}>{context.currentAudio.filename}</Title>
        </ContainerTitle>

        <Slider
          style={{ width: width - 60, height: 40 }}
          minimumValue={0}
          maximumValue={1}
          value={calculatorSeebBar()}
          minimumTrackTintColor="#ccc"
          maximumTrackTintColor="#fff "
        />

        <ContainerTimer>
          <Timer>{convertTime(context.currentAudio.duration)}</Timer>
          <Timer>{renderCurrentTime()}</Timer>
        </ContainerTimer>
        {/**
         * parei no video 28 aos 3:51.
         */}

        <ContainerButtonPlayer>
          <PlayerButton iconType="PREV" size={40} onPress={handlePrevious} />

          <PlayerButton
            onPress={handlePlayPause}
            iconType={context.isPlaying ? "PLAY" : "PAUSE"}
            size={60}
          />

          <PlayerButton iconType="NEXT" size={40} onPress={handleNext} />
        </ContainerButtonPlayer>
      </Container>
    </BackgroundScreen>
  );
}
