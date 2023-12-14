import { Theme } from "@react-navigation/native";
import Colors from "./Colors";

export const customDarkTheme: Theme = {
  dark: true,
  colors: {
    background: Colors.dark.background,
    border: Colors.dark.border,
    card: Colors.dark.card,
    notification: Colors.dark.tint,
    primary: Colors.dark.primary,
    text: Colors.dark.text,
  },
};

export const customDefaultTheme: Theme = {
  dark: false,
  colors: {
    background: Colors.light.background,
    border: Colors.light.border,
    card: Colors.light.card,
    notification: Colors.light.tint,
    primary: Colors.light.primary,
    text: Colors.light.text,
  },
};
