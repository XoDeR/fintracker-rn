import { Image } from "expo-image";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={styles.container}
    >
      <Text style={styles.heading}>Edit app/index.tsx to edit this screen.</Text>
      <Link href={"/about"}>About</Link>
      <Image
        source={{ uri: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2V5Ym9hcmR8ZW58MHx8MHx8fDA%3D" }}
        style={{ width: 100, height: 100 }}
      />
      <Image
        source={require("@/assets/images/react-logo.png")}
        style={{ width: 100, height: 100 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "purple",
  },
  heading: {
    color: "blue",
    fontSize: 20,
  },
});
