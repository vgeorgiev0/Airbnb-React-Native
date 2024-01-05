import listingsData from "@/assets/data/airbnb-listings.json";
import { defaultStyles } from "@/constants/Styles";
import useColors from "@/hooks/useColors";
import { Listing } from "@/types/listing";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useLayoutEffect } from "react";
import {
  Dimensions,
  Image,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  SlideInDown,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");
const height = 300;
interface PageProps {}

const Page: React.FC<PageProps> = ({}) => {
  const { card, text, gray, primary } = useColors();
  const { id } = useLocalSearchParams<{ id: string }>();
  const listing = (listingsData as Listing[]).find((item) => item.id === id);

  const navigation = useNavigation();

  const shareListing = async () => {
    try {
      await Share.share({
        title: listing?.name,
        url: listing?.listing_url || "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerTransparent: true,
      headerBackground: () => (
        <Animated.View
          style={[
            headerAnimatedStyle,
            styles.header,
            { borderBottomColor: gray, backgroundColor: card },
          ]}
        />
      ),
      headerRight: () => (
        <View style={styles.bar}>
          <TouchableOpacity
            style={[styles.roundButton, { borderColor: gray }]}
            onPress={shareListing}
          >
            <Ionicons name="share-outline" size={22} color={"#000"} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.roundButton, { borderColor: gray }]}>
            <Ionicons name="heart-outline" size={22} color={"#000"} />
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={[styles.roundButton, { borderColor: gray }]}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color={"#000"} />
        </TouchableOpacity>
      ),
    });
  }, []);

  // TODO Create a library using the following
  //  ||
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-height, 0, height],
            [-height / 2, 0, height * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-height, 0, height],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, height / 1.5], [0, 1]),
    };
  });
  //  ||
  // TODO Create a library using the above

  return (
    <View style={[styles.container, { backgroundColor: card }]}>
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Animated.Image
          sharedTransitionTag={`image-${listing?.id}`}
          source={{ uri: listing?.xl_picture_url }}
          style={[styles.image, imageAnimatedStyle]}
        />
        <View style={[styles.infoContainer, { backgroundColor: card }]}>
          <Animated.Text
            sharedTransitionTag={`text-${listing?.id}`}
            style={styles.name}
          >
            {listing?.name}
          </Animated.Text>
          <Text style={styles.location}>
            {listing?.room_type} in {listing?.smart_location}
          </Text>
          <Text style={[styles.rooms, { color: gray }]}>
            {listing?.guests_included} guests · {listing?.bedrooms} bedrooms ·{" "}
            {listing?.beds} bed · {listing?.bathrooms} bathrooms
          </Text>
          <View style={{ flexDirection: "row", gap: 4 }}>
            <Ionicons name="star" size={16} />
            <Text style={styles.ratings}>
              {listing?.review_scores_rating
                ? listing?.review_scores_rating / 20
                : 0}{" "}
              · {listing?.number_of_reviews} reviews
            </Text>
          </View>
          <View style={[styles.divider, { backgroundColor: gray }]} />

          <View style={styles.hostView}>
            <Image
              source={{ uri: listing?.host_picture_url }}
              style={[styles.host, { backgroundColor: gray }]}
            />

            <View>
              <Text style={{ fontWeight: "500", fontSize: 16 }}>
                Hosted by {listing?.host_name}
              </Text>
              <Text>Host since {listing?.host_since}</Text>
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: gray }]} />

          <Text style={styles.description}>{listing?.description}</Text>
        </View>
      </Animated.ScrollView>
      <Animated.View
        style={defaultStyles.footer}
        entering={SlideInDown.delay(200)}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity style={styles.footerText}>
            <Text style={styles.footerPrice}>€{listing?.price}</Text>
            <Text>night</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[defaultStyles.btn, { paddingRight: 20, paddingLeft: 20 }]}
          >
            <Text style={defaultStyles.btnText}>Reserve</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height,
    width,
  },
  infoContainer: {
    padding: 24,
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    fontFamily: "SemiBold",
  },
  location: {
    fontSize: 18,
    marginTop: 10,
    fontFamily: "SemiBold",
  },
  rooms: {
    fontSize: 16,
    marginVertical: 4,
    fontFamily: "Regular",
  },
  ratings: {
    fontSize: 16,
    fontFamily: "SemiBold",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginVertical: 16,
  },
  host: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  hostView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  footerText: {
    height: "100%",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  footerPrice: {
    fontSize: 18,
    fontFamily: "SemiBold",
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: "Regular",
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: StyleSheet.hairlineWidth,
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  header: {
    height: 120,
    borderWidth: StyleSheet.hairlineWidth,
  },
});
