import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import useColors from "@/hooks/useColors";
import { defaultStyles } from "@/constants/Styles";

interface ListingsProps {
  listings: any[];
  refresh: number;
  category: string;
}

const Listings: React.FC<ListingsProps> = ({ category, listings, refresh }) => {
  const [loading, setLoading] = useState(false);
  const { background, card } = useColors();

  useEffect(() => {
    setLoading(true);
    const id = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => {
      clearTimeout(id);
    };
  }, [category]);

  return (
    <View style={[defaultStyles.container, { backgroundColor: card }]}>
      {/* <FlatList data={} /> */}
    </View>
  );
};

export default Listings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
