import { Stack } from "expo-router";
import SafeScreen from "@/components/SafeScreen";

export default function RootLayout() {
  return (
    //<Stack />
    <SafeScreen>
      <Stack screenOptions={{ headerShown: false }} />
    </SafeScreen>
  )

  // to hide the header text
  // return <Stack screenOptions={{ headerShown: false }}/>;
}
