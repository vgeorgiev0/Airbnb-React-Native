import { defaultStyles } from "@/constants/Styles";
import useColors from "@/hooks/useColors";
import useWarmUpBrowser from "@/hooks/useWarmUpBrowser";
import { useOAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

enum Strategy {
  Google = "oauth_google",
  Apple = "oauth_apple",
  Facebook = "oauth_facebook",
}
interface LoginModalProps {}

const LoginModal: React.FC<LoginModalProps> = ({}) => {
  useWarmUpBrowser();
  const { card, text, gray } = useColors();

  const router = useRouter();
  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: "oauth_google" });
  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: "oauth_apple" });
  const { startOAuthFlow: facebookAuth } = useOAuth({
    strategy: "oauth_facebook",
  });

  const onSelectAuth = async (strategy: Strategy) => {
    const selectedAuth = {
      [Strategy.Google]: googleAuth,
      [Strategy.Apple]: appleAuth,
      [Strategy.Facebook]: facebookAuth,
    }[strategy];

    try {
      const { createdSessionId, setActive } = await selectedAuth();

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        // router.back();
      }
    } catch (err) {
      console.error("OAuth error", err);
    } finally {
      router.push("/");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: card }]}>
      <TextInput
        autoCapitalize="none"
        placeholder="Email"
        placeholderTextColor={gray}
        style={[
          defaultStyles.inputField,
          {
            backgroundColor: card,
            color: text,
            borderColor: gray,
            marginBottom: 30,
          },
        ]}
      />
      <TouchableOpacity style={[defaultStyles.btn]}>
        <Text style={[defaultStyles.btnText]}>Continue</Text>
      </TouchableOpacity>
      <View style={styles.separator}>
        <View
          style={{
            flex: 1,
            borderBottomColor: text,
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Text style={[styles.separatorText, { color: text }]}>or</Text>
        <View
          style={{
            flex: 1,
            borderBottomColor: text,
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
      </View>

      <View style={{ gap: 20 }}>
        <TouchableOpacity
          style={[
            styles.btnOutline,
            { backgroundColor: card, borderColor: text },
          ]}
        >
          <Ionicons
            name="mail-outline"
            size={24}
            style={[defaultStyles.btnIcon, { color: text }]}
          />
          <Text style={[styles.btnOutlineText, { color: text }]}>
            Continue with Phone
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.btnOutline,
            { backgroundColor: card, borderColor: text },
          ]}
          onPress={() => onSelectAuth(Strategy.Apple)}
        >
          <Ionicons
            name="md-logo-apple"
            size={24}
            style={[defaultStyles.btnIcon, { color: text }]}
          />
          <Text style={[styles.btnOutlineText, { color: text }]}>
            Continue with Apple
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.btnOutline,
            { backgroundColor: card, borderColor: text },
          ]}
          onPress={() => onSelectAuth(Strategy.Google)}
        >
          <Ionicons
            name="md-logo-google"
            size={24}
            style={[defaultStyles.btnIcon, { color: text }]}
          />
          <Text style={[styles.btnOutlineText, { color: text }]}>
            Continue with Google
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.btnOutline,
            { backgroundColor: card, borderColor: text },
          ]}
          onPress={() => onSelectAuth(Strategy.Facebook)}
        >
          <Ionicons
            name="md-logo-facebook"
            size={24}
            style={[defaultStyles.btnIcon, { color: text }]}
          />
          <Text style={[styles.btnOutlineText, { color: text }]}>
            Continue with Facebook
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
  separator: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginVertical: 30,
  },
  separatorText: {
    fontFamily: "SemiBold",
  },
  btnOutline: {
    borderWidth: 1,
    height: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  btnOutlineText: {
    color: "#000",
    fontSize: 16,
    fontFamily: "SemiBold",
  },
});
