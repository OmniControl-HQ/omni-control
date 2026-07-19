import { MaterialIcons } from "@expo/vector-icons";
import { StyleProp, TextStyle } from "react-native";
import { colors } from "../../theme/tokens";

type IconName = keyof typeof MaterialIcons.glyphMap;

type IconProps = {
  name: IconName;
  size?: number;
  color?: string;
  style?: StyleProp<TextStyle>;
};

export function Icon({ name, size = 24, color = colors.primary, style }: IconProps) {
  return <MaterialIcons name={name} size={size} color={color} style={style} />;
}
