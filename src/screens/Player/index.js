import React, { useContext, useEffect } from "react";
import { Dimensions } from "react-native";
import Slider from "@react-native-community/slider";

import { PlayerButton } from "../../components/PlayerButton";

import { AudioContext } from "../../context/AudioProvider";
import { play, pause, resume } from "../../global/audioController";

import {
  BackgroundScreen,
  Container,
  AudioCountText,
  PhotoSound,
  IconPhotoSound,
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
    // play
    if (context.soundObj === null) {
      const audio = context.currentAudio;

      const status = await play(context.playbackObj, audio.uri);

      return context.updateState(context, {
        soundObj: status,
        currentAudio: audio,
        isPlaying: true,
        currentAudioIndex: context.currentAudioIndex,
      });
    }

    // pause
    if (context.soundObj && context.soundObj.isPlaying) {
      const status = await pause(context.playbackObj);

      return context.updateState(context, {
        soundObj: status,
        isPlaying: false,
      });
    }

    // resume
    if (context.soundObj && !context.soundObj.isPlaying) {
      const status = await resume(context.playbackObj);

      return context.updateState(context, {
        soundObj: status,
        isPlaying: true,
      });
    }
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

        <Title>{context.currentAudio.filename}</Title>

        <Slider
          style={{ width: width - 60, height: 40 }}
          minimumValue={0}
          maximumValue={1}
          value={calculatorSeebBar()}
          minimumTrackTintColor="#ccc"
          maximumTrackTintColor="#fff "
        />

        <ContainerTimer>
          <Timer>01:20</Timer>
          <Timer>01:20</Timer>
        </ContainerTimer>

        <ContainerButtonPlayer>
          <PlayerButton iconType="PREV" size={40} />

          <PlayerButton
            onPress={handlePlayPause}
            iconType={context.isPlaying ? "PLAY" : "PAUSE"}
            size={60}
          />

          <PlayerButton iconType="NEXT" size={40} />
        </ContainerButtonPlayer>
      </Container>
    </BackgroundScreen>
  );
}
