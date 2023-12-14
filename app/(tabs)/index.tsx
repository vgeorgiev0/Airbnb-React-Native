import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";

interface HomeScreenProps {}

const HomeScreen: React.FC<HomeScreenProps> = ({}) => {
  return (
    <View style={styles.container}>
      <Link style={styles.linkText} href={"/(modals)/login"}>
        Login
      </Link>
      <Link style={styles.linkText} href={"/(modals)/booking"}>
        Bookings
      </Link>
      <Link style={styles.linkText} href={"/listing/1337"}>
        Listing details
      </Link>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  linkText: {
    fontFamily: "SemiBold",
    fontSize: 16,
  },
});
