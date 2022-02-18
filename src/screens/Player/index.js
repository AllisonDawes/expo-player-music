import React, { useContext, useEffect, useState } from "react";
import { Dimensions } from "react-native";
import Slider from "@react-native-community/slider";

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

  const { playbackPosition, playbackDuration, currentAudio } = context;

  const [currentPosition, setCurrentPosition] = useState(0);

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
  }, []);

  if (!context.currentAudio) return null;

  return (
    <BackgroundScreen>
      <ContainerInfoHeader>
        <AudioCountText>{`${context.currentAudioIndex + 1}/${
          context.totalAudioCount
        }`}</AudioCountText>

        <ContainerTitlePlayList>
          {context.isPlayListRunning && (
            <TitlePlayList>{context.activePlayList.title}</TitlePlayList>
          )}
        </ContainerTitlePlayList>
      </ContainerInfoHeader>

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
