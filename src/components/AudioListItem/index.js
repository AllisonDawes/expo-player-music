import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

import theme from "../../global/theme";

import {
  Container,
  ContainerLeft,
  Thumbnail,
  ThumbnailText,
  ContainerTitle,
  Title,
  Author,
  ContainerRight,
  ButtonOptions,
  IconOptions,
} from "./styles";

const renderPlayPauseIcon = (isPlaying) => {
  if (!isPlaying) {
    return (
      <MaterialIcons
        name="play-arrow"
        size={RFValue(40)}
        color={theme.colors.shape}
      />
    );
  } else {
    return (
      <MaterialIcons
        name="pause"
        size={RFValue(40)}
        color={theme.colors.secundary}
      />
    );
  }
};

export function AudioListItem({
  filename,
  duration,
  onOptionPress,
  onAudioPress,
  isPlaying,
  activeListItem,
}) {
  const getThumbnailText = (filename) => {
    return filename[0];
  };

  const convertTime = (minutes) => {
    if (minutes) {
      const hrs = minutes / 60;
      const minute = hrs.toString().split(".")[0];
      const percent = parseInt(hrs.toString().split(".").slice(0, 2));
      const sec = Math.ceil((60 * percent) / 100);

      if (parseInt(minute) < 10 && sec < 10) {
        return `0${minute}:0${sec}`;
      }

      if (parseInt(minute) < 10) {
        return `0${minute}:${sec}`;
      }

      return `${minute}:${sec}`;
    }
  };

  return (
    <>
      <Container>
        <ContainerLeft onPress={onAudioPress}>
          <Thumbnail
            backgroundthumbnail={isPlaying}
            activeListItemProps={activeListItem}
          >
            <ThumbnailText
              tumbnailTextColor={isPlaying}
              activeListItemProps={activeListItem}
            >
              {activeListItem
                ? renderPlayPauseIcon(isPlaying)
                : getThumbnailText(filename)}
            </ThumbnailText>
          </Thumbnail>

          <ContainerTitle>
            <Title numberOfLines={1}>{filename}</Title>
            <Author>{convertTime(duration)}</Author>
          </ContainerTitle>
        </ContainerLeft>

        <ContainerRight>
          <ButtonOptions onPress={onOptionPress}>
            <IconOptions name="dots-three-vertical" color="#ccc" />
          </ButtonOptions>
        </ContainerRight>
      </Container>
    </>
  );
}
