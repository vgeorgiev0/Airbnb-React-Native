import listingsData from "@/assets/data/airbnb-listings.json";
import ExploreHeader from "@/components/ExploreHeader";
import ListingsBottomSheet from "@/components/ListingsBottomSheet";
import useColors from "@/hooks/useColors";
import { Listing } from "@/types/listing";
import { Stack } from "expo-router";
import React, { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";

interface HomeScreenProps {}

const HomeScreen: React.FC<HomeScreenProps> = ({}) => {
  const { background } = useColors();
  const [category, setCategory] = useState("Tiny homes");
  const items = useMemo(() => listingsData as Listing[], []);

  const onDataChange = (category: string) => {
    setCategory(category);
  };

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChange={onDataChange} />,
        }}
      />
      <ListingsBottomSheet items={items} category={category} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
