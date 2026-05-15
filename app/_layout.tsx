import GlobalLoading from "@/components/ui/GlobalLoading";
import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import { useEffect } from 'react';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import Toast from 'react-native-toast-message';

export default function RootLayout() {
  useEffect(() => {
    NavigationBar.setVisibilityAsync('visible');
    NavigationBar.setStyle("inverted");
  });

  return (
    <>
    <KeyboardProvider>
      <Stack>
        <Stack.Screen name="index" options={{headerShown: false}}/>
        <Stack.Screen name="forgot-password" options={{ title: 'Recuperar Senha', headerBackTitle: 'Voltar' }}/>
        <Stack.Screen name="reset-password" options={{ title: 'Nova Senha', headerBackTitle: 'Voltar' }}/>
        <Stack.Screen name="valid-confirmation-code" options={{ title: 'Validar Código', headerBackTitle: 'Voltar' }}/>
        <Stack.Screen name="onboarding/index" options={{title: 'Criar Conta', headerBackTitle: 'Voltar'}}/>
        <Stack.Screen name="setup-household/index" options={{title: 'Configurar Household', headerBackTitle: 'Voltar'}}/>
        <Stack.Screen name="home/index" options={{headerShown: false}}/>
      </Stack>
    </KeyboardProvider>
    <GlobalLoading />
    <Toast />
    </>
  );
}
