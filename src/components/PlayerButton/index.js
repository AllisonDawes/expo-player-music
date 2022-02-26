import React from "react";

import { Icon } from "./styles";

export function PlayerButton({ iconType, size, iconColor, onPress, ...rest }) {
  const getIconName = (type) => {
    switch (type) {
      case "PLAY":
        return "pause-circle-sharp";
      case "PAUSE":
        return "play-circle-sharp";
      case "NEXT":
        return "play-skip-forward-sharp";
      case "PREV":
        return "play-skip-back-sharp";
      default:
        return;
    }
  };

  return (
    <Icon
      onPress={onPress}
      name={getIconName(iconType)}
      size={size}
      color={iconColor}
      {...rest}
    />
  );
}
