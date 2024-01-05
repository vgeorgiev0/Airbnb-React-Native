import { categories } from "@/constants";
import useColors from "@/hooks/useColors";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Link } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  ListRenderItem,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface CategoryItemProps {
  name: string;
  icon: any;
}
interface ExploreHeaderProps {
  onCategoryChange: (category: string) => void;
}

const ExploreHeader: React.FC<ExploreHeaderProps> = ({ onCategoryChange }) => {
  const flatListRef = useRef<FlatList>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const itemsRef = useRef<Array<TouchableOpacity | null>>([]);
  const { card, gray, text } = useColors();

  const selectCategory = (index: number) => {
    const selected = itemsRef.current[index];
    setActiveIndex(index);
    selected?.measure(() => {
      flatListRef.current?.scrollToIndex({
        index: index === 0 ? 0 : index - 0.01,
        animated: true,
      });
    });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onCategoryChange(categories[index].name);
  };

  const CategoryItem: ListRenderItem<CategoryItemProps> = (data) => {
    const { index, item } = data;
    return (
      <TouchableOpacity
        key={index}
        onPress={() => selectCategory(index)}
        ref={(el) => (itemsRef.current[index] = el)}
        style={
          activeIndex === index
            ? [
                styles.categoriesButton,
                { borderBottomColor: text, borderBottomWidth: 2 },
              ]
            : [styles.categoriesButton]
        }
      >
        <MaterialIcons
          style={activeIndex === index ? [{ color: text }] : [{ color: gray }]}
          name={item.icon}
          size={24}
        />
        <Text
          style={
            activeIndex === index
              ? [styles.categoryText, { color: text }]
              : [styles.categoryText, { color: gray }]
          }
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView>
      <SafeAreaView style={[styles.safeArea, { backgroundColor: card }]}>
        <View style={[styles.container, { backgroundColor: card }]}>
          <View style={styles.actionRow}>
            <Link href={"/(modals)/booking"} style={[{ color: text }]} asChild>
              <TouchableOpacity>
                <View
                  style={[
                    styles.searchButton,
                    { borderColor: text, backgroundColor: card },
                  ]}
                >
                  <Ionicons name="search" size={24} color={text} />
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.semiBoldText, { color: text }]}>
                      Where To?
                    </Text>
                    <Text style={[styles.regularText, { color: gray }]}>
                      Anywhere · Any week
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </Link>
            <TouchableOpacity>
              <Ionicons
                name="options-outline"
                size={24}
                style={[
                  styles.filterButton,
                  { borderColor: text, color: text },
                ]}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            ref={flatListRef}
            data={categories}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: "center",
              justifyContent: "center",
              gap: 30,
              paddingHorizontal: 16,
            }}
            renderItem={({ index, item, separators }) => (
              <CategoryItem separators={separators} index={index} item={item} />
            )}
            horizontal
            scrollEnabled
            nestedScrollEnabled
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default ExploreHeader;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    paddingTop: Platform.OS === "android" ? 50 : 0,
    height: 180,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  filterButton: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 24,
    marginHorizontal: 10,
  },
  regularText: {
    fontFamily: "Regular",
  },
  semiBoldText: {
    fontFamily: "SemiBold",
  },
  searchButton: {
    marginHorizontal: 2,
    marginVertical: 2,
    flexDirection: "row",
    gap: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    alignItems: "center",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#c2c2c2",
    borderRadius: 30,
    elevation: 2,
    width: Dimensions.get("screen").width - 100,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  categoryText: {
    fontSize: 14,
    fontFamily: "SemiBold",
  },
  categoriesButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 8,
  },
});
