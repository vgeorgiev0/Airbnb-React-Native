import Colors from "@/constants/Colors";
import { ColorSchemeName } from "react-native";

export const getColorBasedOnTheme = (
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
  theme: ColorSchemeName
) => {
  return Colors[theme!][colorName];
};
