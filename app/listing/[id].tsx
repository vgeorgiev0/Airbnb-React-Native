import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import listingsData from "@/assets/data/airbnb-listings.json";
import { Listing } from "@/types/listing";
import useColors from "@/hooks/useColors";
import Animated, { SlideInDown, useAnimatedRef } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { defaultStyles } from "@/constants/Styles";

const { width } = Dimensions.get("window");
const height = 300;
interface PageProps {}

const Page: React.FC<PageProps> = ({}) => {
  const { card, text, gray } = useColors();
  const { id } = useLocalSearchParams<{ id: string }>();
  const listing = (listingsData as Listing[]).find((item) => item.id === id);
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  return (
    <View style={[styles.container, { backgroundColor: card }]}>
      <Animated.ScrollView
        ref={scrollRef}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Animated.Image
          source={{ uri: listing?.xl_picture_url }}
          style={styles.image}
        />
        <View style={[styles.infoContainer, { backgroundColor: card }]}>
          <Text style={styles.name}>{listing?.name}</Text>
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
});
