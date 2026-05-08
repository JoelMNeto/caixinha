import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { api } from "@/services/api";
import { saveTokens } from "@/services/auth";
import { globalStyles } from "@/styles/global";
import { validateFormField } from "@/utils/validation";
import { Image } from 'expo-image';
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

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

  const updateEmail = (value: string) => {
    const emailResult = validateFormField("email", { email: value });

    if (emailResult.error) {
      setError(emailResult.error);
    } else {
      setEmail(value);
      setError("");
    }
  };
  
  return (
    <KeyboardAwareScrollView
      bottomOffset={20}
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <View style={{ flex: 1 }}>
        <View style={[globalStyles.container, { flex: 1 }]}>
          <Image source={require('@/assets/images/caixinha_icone.png')} style={globalStyles.logo} />
          
          <Input 
            placeholder="Email" 
            value={email} 
            onChangeText={(value: string) => updateEmail(value)} 
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
      </View>
    </KeyboardAwareScrollView>
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