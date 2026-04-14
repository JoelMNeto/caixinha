import GlobalLoading from "@/components/ui/GlobalLoading";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <>
    <Stack screenOptions={{ header: () => null }}>
      <Stack.Screen name="index"/>
      <Stack.Screen name="forgot-password"/>
      <Stack.Screen name="reset-password"/>
      <Stack.Screen name="valid-confirmation-code"/>
      <Stack.Screen name="signup"/>
    </Stack>
    <GlobalLoading />
    </>
  );
}
