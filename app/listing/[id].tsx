import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

interface PageProps {}

const Page: React.FC<PageProps> = ({}) => {
  const { id } = useLocalSearchParams<{ id: string }>();
  console.log("🚀 ~ file: [id].tsx:9 ~ id:", id);
  return (
    <View>
      <Text>Page</Text>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
