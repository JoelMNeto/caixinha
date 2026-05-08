import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { api } from "@/services/api";
import { saveTokens } from "@/services/auth";
import { globalStyles } from "@/styles/global";
import { validateFormField } from "@/utils/validation";
import { Image } from 'expo-image';
import { useRouter } from "expo-router";
import { useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const result = validateFormField("email", { email });

    if (result.error) {
      setError(result.error);
      return;
    }

    setError("");

    const { data } = await api.post("/auth/login", 
      { email, password }, 
      { skipAuth: true }
    );

    await saveTokens(data.accessToken, data.refreshToken);

    router.push("./home");
  }
  
  return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <View style={[globalStyles.container, { flex: 1 }]}>
                    <Image source={require('@/assets/images/caixinha_icone.png')} style={globalStyles.logo} />
                  
                    <Input 
                      placeholder="Email" 
                      value={email} 
                      onChangeText={(value: string) => {
                        setEmail(value);
                        if (error) setError("");
                      }} 
                      error={error}
                    />

                    <Input
                      placeholder="Password" 
                      secure={true} 
                      value={password} 
                      onChangeText={setPassword} 
                    />

                    <TouchableOpacity style={styles.forgotContainer}>
                      <Text 
                      style={[globalStyles.linkText, {marginTop: 0}]} 
                      onPress={() => router.push('./forgot-password')}>Esqueci minha senha</Text>
                    </TouchableOpacity>
                    
                    <Button title="Entrar" onPress={handleLogin} />

                    <View style={styles.registerContainer}>
                      <Text style={{marginTop: 16}}>Não tem conta? </Text>
                      <TouchableOpacity>
                        <Text 
                          style={globalStyles.linkText} 
                          onPress={() => router.push('./onboarding')}
                        >Criar Conta</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  forgotContainer: {
    alignSelf: 'flex-end',
    marginRight: 5,
    marginBottom: 20,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});