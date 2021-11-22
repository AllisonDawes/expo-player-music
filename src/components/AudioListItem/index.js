import React from "react";

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

export function AudioListItem({
  filename,
  duration,
  onOptionPress,
  onAudioPress,
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
          <Thumbnail>
            <ThumbnailText>{getThumbnailText(filename)}</ThumbnailText>
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
