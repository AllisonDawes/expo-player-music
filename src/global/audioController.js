import { storeAudioForNextOpening } from "./helper";

// Play Audio
export const play = async (playbackObj, uri) => {
  try {
    return await playbackObj.loadAsync(
      { uri },
      { shouldPlay: true, progressUpdateIntervalMillis: 1000 }
    );
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

export const selectAudio = async (audio, context) => {
  const {
    playbackObj,
    soundObj,
    currentAudio,
    updateState,
    audioFiles,
    onPlaybackStatusUpdate,
  } = context;

  try {
    if (soundObj === null) {
      const status = await play(playbackObj, audio.uri);

      const index = audioFiles.indexOf(audio);

      updateState(context, {
        currentAudio: audio,
        soundObj: status,
        isPlaying: true,
        currentAudioIndex: index,
      });

      playbackObj.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);

      return storeAudioForNextOpening(audio, index);
    }

    //Select another audio for the first time:
    if (soundObj.isLoaded && currentAudio.id !== audio.id) {
      const status = await playNext(playbackObj, audio.uri);

      const index = audioFiles.indexOf(audio);

      updateState(context, {
        currentAudio: audio,
        soundObj: status,
        isPlaying: true,
        currentAudioIndex: index,
      });

      return storeAudioForNextOpening(audio, index);
    }

    //Pause audio:
    if (
      soundObj.isLoaded &&
      soundObj.isPlaying &&
      currentAudio.id === audio.id
    ) {
      const status = await pause(playbackObj);

      return updateState(context, {
        soundObj: status,
        isPlaying: false,
        playbackPosition: status.positionMillis,
      });
    }

    //resume audio:
    if (
      soundObj.isLoaded &&
      !soundObj.isPlaying &&
      currentAudio.id === audio.id
    ) {
      const status = await resume(playbackObj);

      return updateState(context, {
        soundObj: status,
        isPlaying: true,
      });
    }
  } catch (err) {
    console.log("error inside select audio method.", err.message);
  }
};

export const changeAudio = async (context, select) => {
  const {
    playbackObj,
    currentAudioIndex,
    totalAudioCount,
    audioFiles,
    updateState,
  } = context;

  try {
    const { isLoaded } = await playbackObj.getStatusAsync();

    const isLastAudio = currentAudioIndex + 1 === totalAudioCount;
    const isFirstAudio = currentAudioIndex <= 0;

    let audio;
    let index;
    let status;

    //for next:
    if (select === "next") {
      audio = audioFiles[currentAudioIndex + 1];

      if (!isLoaded && !isLastAudio) {
        index = currentAudioIndex + 1;
        status = await play(playbackObj, audio.uri);
      }

      if (isLoaded && !isLastAudio) {
        index = currentAudioIndex + 1;
        status = await playNext(playbackObj, audio.uri);
      }

      if (isLastAudio) {
        index = 0;
        audio = audioFiles[index];
        if (isLoaded) {
          status = await playNext(playbackObj, audio.uri);
        } else {
          status = await play(playbackObj, audio.uri);
        }
      }
    }

    //for previous:
    if (select === "previous") {
      audio = audioFiles[currentAudioIndex - 1];

      if (!isLoaded && !isFirstAudio) {
        index = currentAudioIndex + 1;
        status = await play(playbackObj, audio.uri);
      }

      if (isLoaded && !isFirstAudio) {
        index = currentAudioIndex - 1;
        status = await playNext(playbackObj, audio.uri);
      }

      if (isFirstAudio) {
        index = totalAudioCount - 1;
        audio = audioFiles[index];
        if (isLoaded) {
          status = await playNext(playbackObj, audio.uri);
        } else {
          status = await play(playbackObj, audio.uri);
        }
      }
    }

    updateState(context, {
      currentAudio: audio,
      soundObj: status,
      isPlaying: true,
      currentAudioIndex: index,
      playbackPosition: null,
      playbackDuration: null,
    });

    storeAudioForNextOpening(audio, index);
  } catch (err) {
    console.log("error inside change audio method.", err.message);
  }
};

export const moveAudio = async (context, value) => {
  const { soundObj, isPlaying, playbackObj, updateState } = context;

  if (soundObj === null || !isPlaying) return;

  try {
    const status = await playbackObj.setPositionAsync(
      Math.floor(soundObj.durationMillis * value)
    );

    updateState(context, {
      soundObj: status,
      playbackPosition: status.positionMillis,
    });

    await resume(playbackObj);
  } catch (err) {
    console.log("error inside onSlidingComplete callback", err);
  }
};
