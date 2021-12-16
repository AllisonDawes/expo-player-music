import React from "react";

import {
  BackgroundScreen,
  Container,
  ButtonPlayList,
  MyFavorite,
  NumberSongs,
  ButtonNewPlayList,
  TextNewPlayList,
} from "./styles";

export function PlayList() {
  return (
    <BackgroundScreen>
      <Container>
        <ButtonPlayList onPress={() => {}}>
          <MyFavorite>PlayList</MyFavorite>
          <NumberSongs>0 Songs</NumberSongs>
        </ButtonPlayList>

        <ButtonNewPlayList onPress={() => {}}>
          <TextNewPlayList>+ Add Nova PlayList</TextNewPlayList>
        </ButtonNewPlayList>
      </Container>
    </BackgroundScreen>
  );
}
