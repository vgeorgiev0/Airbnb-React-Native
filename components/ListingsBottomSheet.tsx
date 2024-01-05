import Listings from "@/components/Listings";
import useColors from "@/hooks/useColors";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { useMemo, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ListingsBottomSheetProps {
  items: any[];
  category: string;
}

const ListingsBottomSheet: React.FC<ListingsBottomSheetProps> = ({
  items,
  category,
}) => {
  const { text, tint, card } = useColors();
  const snapPoints = useMemo(() => ["10%", "100%"], []);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [refresh, setRefresh] = useState<number>(0);

  const onShowMap = () => {
    bottomSheetRef.current?.collapse();
    setRefresh(refresh + 1);
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      handleIndicatorStyle={{ backgroundColor: text }}
      handleStyle={{ backgroundColor: card }}
      style={[styles.sheetContainer, { backgroundColor: card }]}
    >
      <View style={styles.contentContainer}>
        <Listings items={items} refresh={refresh} category={category} />
        <View style={styles.absoluteView}>
          <TouchableOpacity
            onPress={onShowMap}
            style={[styles.btn, { backgroundColor: tint }]}
          >
            <Text style={{ fontFamily: "SemiBold", color: card }}>Map</Text>
            <Ionicons
              name="map"
              size={20}
              style={{ marginLeft: 10 }}
              color={card}
            />
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  absoluteView: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    alignItems: "center",
  },
  btn: {
    // backgroundColor: Colors.dark,
    padding: 14,
    height: 50,
    borderRadius: 30,
    flexDirection: "row",
    marginHorizontal: "auto",
    alignItems: "center",
  },
  sheetContainer: {
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
});

export default ListingsBottomSheet;
