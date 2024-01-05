import { StyleSheet, Text, View } from "react-native";
import React, { useMemo, useState } from "react";
import { Link, Stack } from "expo-router";
import ExploreHeader from "@/components/ExploreHeader";
import Listings from "@/components/Listings";
import useColors from "@/hooks/useColors";
import listingsData from "@/assets/data/airbnb-listings.json";

interface HomeScreenProps {}

const HomeScreen: React.FC<HomeScreenProps> = ({}) => {
  const { background, card } = useColors();
  const [category, setCategory] = useState("Tiny homes");
  const items = useMemo(() => listingsData as any, []);

  const onDataChange = (category: string) => {
    console.log(category);
    setCategory(category);
  };

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChange={onDataChange} />,
        }}
      />
      <Listings category={category} listings={items} refresh={1} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
