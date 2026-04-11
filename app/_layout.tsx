import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Login" }} />
      <Stack.Screen name="forgot-password" options={{ title: "Recuperar Senha" }} />
      <Stack.Screen name="reset-password" options={{ title: "Nova Senha" }}/>
      <Stack.Screen name="valid-confirmation-code" options={{ title: "Validar Código de Confirmação" }} />
      <Stack.Screen name="signup" options={{ title: "Criar Conta" }} />
    </Stack>
  );
}
