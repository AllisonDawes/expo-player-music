// Play Audio
export const play = async (playbackObj, uri) => {
  try {
    return await playbackObj.loadAsync({ uri }, { shouldPlay: true });
  } catch (err) {
    console.log("error inside play helper method", err.mesage);
  }
};

// Pause Audio
export const pause = async (playbackObj) => {
  try {
    return await playbackObj.setStatusAsync({
      shouldPlay: false,
    });
  } catch (err) {
    console.log("error inside pause helper method", err.mesage);
  }
};

// Resume Audio
export const resume = async (playbackObj) => {
  try {
    return await playbackObj.playAsync();
  } catch (err) {
    console.log("error inside resume helper method", err.mesage);
  }
};

// Resume Audio
export const playNext = async (playbackObj, uri) => {
  try {
    await playbackObj.stopAsync();
    await playbackObj.unloadAsync();

    return await play(playbackObj, uri);
  } catch (err) {
    console.log("error inside playNext helper method", err.mesage);
  }
};
