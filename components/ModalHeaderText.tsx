import useColors from "@/hooks/useColors";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const ModalHeaderText = () => {
  const [active, setActive] = useState(0);
  const { gray } = useColors();
  return (
    <View style={{ flexDirection: "row", justifyContent: "center", gap: 10 }}>
      <TouchableOpacity onPress={() => setActive(0)}>
        <Text
          style={{
            fontFamily: "SemiBold",
            fontSize: 18,
            color: active == 0 ? "#000" : gray,
            textDecorationLine: active == 0 ? "underline" : "none",
          }}
        >
          Stays
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setActive(1)}>
        <Text
          style={{
            fontFamily: "SemiBold",
            fontSize: 18,
            color: active == 1 ? "#000" : gray,
            textDecorationLine: active == 1 ? "underline" : "none",
          }}
        >
          Experiences
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModalHeaderText;
