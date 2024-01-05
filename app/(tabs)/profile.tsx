import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAuth } from "@clerk/clerk-expo";
import { Link } from "expo-router";

interface ProfileScreenProps {}

const ProfileScreen: React.FC<ProfileScreenProps> = ({}) => {
  const { signOut, isSignedIn } = useAuth();
  return (
    <View>
      {isSignedIn && (
        <Button
          title="Log out"
          onPress={() => {
            signOut();
          }}
        />
      )}
      {!isSignedIn && (
        <Link href={"/(modals)/login"}>
          <Text>Login</Text>
        </Link>
      )}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
