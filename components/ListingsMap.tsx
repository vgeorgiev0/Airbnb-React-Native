import { INITIAL_REGION } from "@/constants";
import { defaultStyles } from "@/constants/Styles";
import { Listing } from "@/types/listing";
import { useRouter } from "expo-router";
import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView from "react-native-map-clustering";
import { Marker } from "react-native-maps";

interface ClusterType {
  clusterColor: string;
  clusterFontFamily: undefined;
  clusterTextColor: string;
  geometry: Geometry;
  id: number;
  properties: Properties;
  type: string;
  onPress: () => void;
}

interface Properties {
  cluster: boolean;
  cluster_id: number;
  point_count: number;
  point_count_abbreviated: number;
}

interface Geometry {
  coordinates: number[];
  type: string;
}

interface ListingsMapProps {
  listings: Listing[];
}

const ListingsMap: React.FC<ListingsMapProps> = ({ listings }) => {
  const router = useRouter();

  const onMarkerSelect = (listing: Listing) => {
    router.push(`/listing/${listing.id}`);
  };

  const renderCluster = (cluster: ClusterType) => {
    const { geometry, id, properties, onPress } = cluster;
    const latitude = geometry.coordinates[1];
    const longitude = geometry.coordinates[0];
    const points = properties.point_count;

    return (
      <Marker
        key={`cluster-${id}`}
        coordinate={{ latitude, longitude }}
        onPress={onPress}
      >
        <View style={styles.marker}>
          <Text style={styles.markerText}>{points}</Text>
        </View>
      </Marker>
    );
  };

  return (
    <View style={defaultStyles.container}>
      <MapView
        renderCluster={renderCluster}
        animationEnabled={false}
        style={styles.map}
        region={INITIAL_REGION}
        clusterColor="#fff"
        clusterFontFamily="SemiBold"
        clusterTextColor="#000"
        showsMyLocationButton
        showsUserLocation
        provider="google"
        mapPadding={{ bottom: 50, left: 0, right: 0, top: 0 }}
      >
        {listings.map((item) => {
          const { longitude, latitude } = item;
          return (
            <Marker
              tracksViewChanges={false}
              key={item.id}
              coordinate={{ longitude: +longitude, latitude: +latitude }}
              onPress={() => onMarkerSelect(item)}
            >
              <View style={styles.marker}>
                <Text style={styles.markerText}>€ {item.price}</Text>
              </View>
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
};

export default memo(ListingsMap);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: StyleSheet.absoluteFillObject,
  marker: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 6,
    borderRadius: 12,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
  },
  markerText: {
    fontFamily: "SemiBold",
    fontSize: 14,
  },
});
