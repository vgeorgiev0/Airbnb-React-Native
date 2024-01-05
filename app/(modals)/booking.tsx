import { places } from "@/assets/data/places";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
} from "react-native-reanimated";
// @ts-ignore
import DatePicker from "react-native-modern-datepicker";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const guestsGroups = [
  {
    name: "Adults",
    text: "Ages 13 or above",
    count: 0,
  },
  {
    name: "Children",
    text: "Ages 2-12",
    count: 0,
  },
  {
    name: "Infants",
    text: "Under 2",
    count: 0,
  },
  {
    name: "Pets",
    text: "Pets allowed",
    count: 0,
  },
];

const Page = () => {
  const today = new Date().toISOString().substring(0, 10);
  const [openCard, setOpenCard] = useState(0);
  const [selectedPlace, setSelectedPlace] = useState(0);
  const [groups, setGroups] = useState(guestsGroups);
  const router = useRouter();

  const onClearAll = () => {
    setSelectedPlace(0);
    setOpenCard(0);
    setGroups(guestsGroups);
  };

  return (
    <BlurView intensity={70} style={styles.container} tint="light">
      <ScrollView style={{ marginBottom: 100 }}>
        {/*  Where */}
        <View style={styles.card}>
          {openCard != 0 && (
            <AnimatedTouchableOpacity
              onPress={() => setOpenCard(0)}
              style={styles.cardPreview}
              entering={FadeIn.duration(200)}
              exiting={FadeOut.duration(200)}
            >
              <Text style={styles.previewText}>Where</Text>
              <Text style={styles.previewedData}>I'm flexible</Text>
            </AnimatedTouchableOpacity>
          )}

          {openCard == 0 && <Text style={styles.cardHeader}>Where to?</Text>}
          {openCard == 0 && (
            <Animated.View
              entering={FadeIn}
              exiting={FadeOut}
              style={styles.cardBody}
            >
              <View style={styles.searchSection}>
                <Ionicons
                  style={styles.searchIcon}
                  name="ios-search"
                  size={20}
                  color="#000"
                />
                <TextInput
                  style={styles.inputField}
                  placeholder="Search destinations"
                  placeholderTextColor={"#ccc"}
                />
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.placesContainer}
              >
                {places.map((item, index) => (
                  <TouchableOpacity
                    onPress={() => setSelectedPlace(index)}
                    key={index}
                  >
                    <Image
                      source={item.img}
                      style={
                        selectedPlace == index
                          ? styles.placeSelected
                          : styles.place
                      }
                    />
                    <Text style={{ fontFamily: "Regular", paddingTop: 6 }}>
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </Animated.View>
          )}
        </View>

        {/* When */}
        <View style={styles.card}>
          {openCard != 1 && (
            <AnimatedTouchableOpacity
              onPress={() => setOpenCard(1)}
              style={styles.cardPreview}
              entering={FadeIn.duration(200)}
              exiting={FadeOut.duration(200)}
            >
              <Text style={styles.previewText}>When</Text>
              <Text style={styles.previewedData}>Any week</Text>
            </AnimatedTouchableOpacity>
          )}

          {openCard == 1 && (
            <Text style={styles.cardHeader}>When's your trip?</Text>
          )}

          {openCard == 1 && (
            <Animated.View style={styles.cardBody}>
              <DatePicker
                options={{
                  defaultFont: "Regular",
                  headerFont: "SemiBold",
                  mainColor: Colors.light.primary,
                  borderColor: "transparent",
                }}
                current={today}
                selected={today}
                mode={"calendar"}
              />
            </Animated.View>
          )}
        </View>

        {/* Guests */}
        <View style={styles.card}>
          {openCard != 2 && (
            <AnimatedTouchableOpacity
              onPress={() => setOpenCard(2)}
              style={styles.cardPreview}
              entering={FadeIn.duration(200)}
              exiting={FadeOut.duration(200)}
            >
              <Text style={styles.previewText}>Who</Text>
              <Text style={styles.previewedData}>Add guests</Text>
            </AnimatedTouchableOpacity>
          )}

          {openCard == 2 && (
            <Text style={styles.cardHeader}>Who's coming?</Text>
          )}

          {openCard == 2 && (
            <Animated.View style={styles.cardBody}>
              {groups.map((item, index) => (
                <View
                  key={index}
                  style={[
                    styles.guestItem,
                    index + 1 < guestsGroups.length ? styles.itemBorder : null,
                  ]}
                >
                  <View>
                    <Text style={{ fontFamily: "SemiBold", fontSize: 14 }}>
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Regular",
                        fontSize: 14,
                        color: "#ccc",
                      }}
                    >
                      {item.text}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      gap: 10,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        const newGroups = [...groups];
                        newGroups[index].count =
                          newGroups[index].count > 0
                            ? newGroups[index].count - 1
                            : 0;

                        setGroups(newGroups);
                      }}
                    >
                      <Ionicons
                        name="remove-circle-outline"
                        size={26}
                        color={groups[index].count > 0 ? "#ccc" : "#cdcdcd"}
                      />
                    </TouchableOpacity>
                    <Text
                      style={{
                        fontFamily: "Regular",
                        fontSize: 16,
                        minWidth: 18,
                        textAlign: "center",
                      }}
                    >
                      {item.count}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        const newGroups = [...groups];
                        newGroups[index].count++;
                        setGroups(newGroups);
                      }}
                    >
                      <Ionicons
                        name="add-circle-outline"
                        size={26}
                        color={"#ccc"}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </Animated.View>
          )}
        </View>
      </ScrollView>
      {/* Footer */}
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
          <TouchableOpacity
            style={{ height: "100%", justifyContent: "center" }}
            onPress={onClearAll}
          >
            <Text
              style={{
                fontSize: 18,
                fontFamily: "SemiBold",
                textDecorationLine: "underline",
              }}
            >
              Clear all
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[defaultStyles.btn, { paddingRight: 20, paddingLeft: 50 }]}
            onPress={() => router.back()}
          >
            <Ionicons
              name="search-outline"
              size={24}
              style={defaultStyles.btnIcon}
              color={"#fff"}
            />
            <Text style={defaultStyles.btnText}>Search</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    margin: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    gap: 20,
  },
  cardHeader: {
    fontFamily: "Bold",
    fontSize: 24,
    padding: 20,
  },
  cardBody: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  cardPreview: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },

  searchSection: {
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ABABAB",
    borderRadius: 8,
    marginBottom: 16,
  },
  searchIcon: {
    padding: 10,
  },
  inputField: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  placesContainer: {
    flexDirection: "row",
    gap: 25,
  },
  place: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  placeSelected: {
    borderColor: "#ccc",
    borderWidth: 2,
    borderRadius: 10,
    width: 100,
    height: 100,
  },
  previewText: {
    fontFamily: "SemiBold",
    fontSize: 14,
    color: "#ccc",
  },
  previewedData: {
    fontFamily: "SemiBold",
    fontSize: 14,
    color: "#000",
  },

  guestItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },
  itemBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ccc",
  },
});
export default Page;
