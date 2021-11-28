import React, { useContext, useEffect } from "react";
import { Dimensions } from "react-native";
import Slider from "@react-native-community/slider";

import { storeAudioForNextOpening } from "../../global/helper";

import { PlayerButton } from "../../components/PlayerButton";

import { AudioContext } from "../../context/AudioProvider";
import { play, pause, resume, playNext } from "../../global/audioController";

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

  const handlePrevious = async () => {
    const { isLoaded } = await context.playbackObj.getStatusAsync();

    const isFirstAudio = context.currentAudioIndex <= 0;

    let audio = context.audioFiles[context.currentAudioIndex - 1];
    let index;
    let status;

    if (!isLoaded && !isFirstAudio) {
      index = context.currentAudioIndex + 1;
      status = await play(context.playbackObj, audio.uri);
    }

    if (isLoaded && !isFirstAudio) {
      index = context.currentAudioIndex + 1;
      status = await playNext(context.playbackObj, audio.uri);
    }

    if (isFirstAudio) {
      index = context.totalAudioCount - 1;
      audio = context.audioFiles[index];
      if (isLoaded) {
        status = await playNext(context.playbackObj, audio.uri);
      } else {
        status = await play(context.playbackObj, audio.uri);
      }
    }

    context.updateState(context, {
      currentAudio: audio,
      playbackObj: context.playbackObj,
      soundObj: status,
      isPlaying: true,
      currentAudioIndex: index,
    });

    storeAudioForNextOpening(audio, index);
  };

  const handleNext = async () => {
    const { isLoaded } = await context.playbackObj.getStatusAsync();

    const isLastAudio =
      context.currentAudioIndex + 1 === context.totalAudioCount;

    let audio = context.audioFiles[context.currentAudioIndex + 1];
    let index;
    let status;

    if (!isLoaded && !isLastAudio) {
      index = context.currentAudioIndex + 1;
      status = await play(context.playbackObj, audio.uri);
    }

    if (isLoaded && !isLastAudio) {
      index = context.currentAudioIndex + 1;
      status = await playNext(context.playbackObj, audio.uri);
    }

    if (isLastAudio) {
      index = 0;
      audio = context.audioFiles[index];
      if (isLoaded) {
        status = await playNext(context.playbackObj, audio.uri);
      } else {
        status = await play(context.playbackObj, audio.uri);
      }
    }

    context.updateState(context, {
      currentAudio: audio,
      playbackObj: context.playbackObj,
      soundObj: status,
      isPlaying: true,
      currentAudioIndex: index,
    });

    storeAudioForNextOpening(audio, index);
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
