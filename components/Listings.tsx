import { defaultStyles } from "@/constants/Styles";
import useColors from "@/hooks/useColors";
import { Listing } from "@/types/listing";
import { Ionicons } from "@expo/vector-icons";
import {
  BottomSheetFlatList,
  BottomSheetFlatListMethods,
} from "@gorhom/bottom-sheet";
import { Link } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";

interface ListingsProps {
  items: Listing[];
  refresh: number;
  category: string;
}

const Listings: React.FC<ListingsProps> = ({ category, items, refresh }) => {
  const listRef = useRef<BottomSheetFlatListMethods>(null);
  const [loading, setLoading] = useState(false);
  const { card, text, gray } = useColors();

  const scrollListTop = () => {
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  useEffect(() => {
    if (refresh) {
      scrollListTop();
    }
  }, [refresh]);

  useEffect(() => {
    setLoading(true);
    const id = setTimeout(() => {
      setLoading(false);
    }, 200);
    return () => {
      clearTimeout(id);
    };
  }, [category]);

  const renderRow: ListRenderItem<Listing> = ({ item, index }) => (
    <Animated.View>
      <Link href={`/listing/${item.id}`} asChild>
        <TouchableOpacity>
          <Animated.View
            style={styles.listing}
            entering={FadeInRight.delay(200 * index)}
            exiting={FadeOutLeft}
          >
            <Animated.Image
              sharedTransitionTag={`image-${item.id}`}
              source={{ uri: item.xl_picture_url }}
              style={styles.image}
            />
            <TouchableOpacity
              style={{ position: "absolute", right: 30, top: 30 }}
            >
              <Ionicons name="heart-outline" size={24} color="#000" />
            </TouchableOpacity>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Animated.Text
                sharedTransitionTag={`text-${item.id}`}
                style={{ fontSize: 16, fontFamily: "SemiBold", color: text }}
              >
                {item.name}
              </Animated.Text>
              <View style={{ flexDirection: "row", gap: 4 }}>
                <Ionicons name="star" size={16} />
                <Text style={{ fontFamily: "SemiBold", color: text }}>
                  {item.review_scores_rating / 20}
                </Text>
              </View>
            </View>
            <Text style={{ fontFamily: "Regular", color: text }}>
              {item.room_type}
            </Text>
            <View style={{ flexDirection: "row", gap: 4 }}>
              <Text style={{ fontFamily: "SemiBold", color: text }}>
                € {item.price}
              </Text>
              <Text style={{ fontFamily: "Regular", color: text }}>night</Text>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </Link>
    </Animated.View>
  );

  return (
    <View style={[defaultStyles.container, { backgroundColor: card }]}>
      <BottomSheetFlatList
        ref={listRef}
        data={loading ? [] : items}
        renderItem={renderRow}
        ListHeaderComponent={
          <Text style={styles.info}>{items.length + 10} homes</Text>
        }
      />
    </View>
  );
};

export default Listings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listing: {
    padding: 16,
    gap: 10,
    marginVertical: 16,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },
  info: {
    textAlign: "center",
    fontFamily: "SemiBold",
    fontSize: 16,
    marginTop: 4,
  },
});
