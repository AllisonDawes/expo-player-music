import React from "react";
import theme from "../../global/theme";

import { Icon } from "./styles";

export function PlayerButton({
  iconType,
  size,
  iconColor = theme.colors.primary_light,
  onPress,
  ...rest
}) {
  const getIconName = (type) => {
    switch (type) {
      case "PLAY":
        return "pausecircle";
      case "PAUSE":
        return "playcircleo";
      case "NEXT":
        return "forward";
      case "PREV":
        return "banckward";
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
