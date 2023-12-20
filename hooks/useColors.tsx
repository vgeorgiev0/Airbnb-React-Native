import Colors from "@/constants/Colors";
import { getColorBasedOnTheme } from "@/utils/getColorBasedOnTheme";
import { useColorScheme } from "react-native";

const useColors = () => {
  const theme = useColorScheme();
  const getColor = (
    colorName: keyof typeof Colors.light & keyof typeof Colors.dark
  ) => getColorBasedOnTheme(colorName, theme);

  const colors = {
    background: getColor("background"),
    card: getColor("card"),
    text: getColor("text"),
    tint: getColor("tint"),
    gray: getColor("grey"),
    tabIconSelected: getColor("tabIconSelected"),
    transparent: getColor("border"),
    primary: getColor("primary"),
  };
  return colors;
};

export default useColors;
