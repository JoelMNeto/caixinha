import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { api } from "@/services/api";
import { saveTokens } from "@/services/auth";
import { globalStyles } from "@/styles/global";
import { Image } from 'expo-image';
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const { data } = await api.post("/auth/login", 
      { email, password }, 
      { skipAuth: true }
    );

    await saveTokens(data.accessToken, data.refreshToken);

    router.push("./home");
  }
  
  return (
    <View style={globalStyles.container}>
      <Image source={require('@/assets/images/caixinha_icone.png')} style={globalStyles.logo} />
    
      <Input placeholder="Email" value={email} onChangeText={setEmail} />

      <Input
        placeholder="Password" 
        secureTextEntry 
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
            onPress={() => router.push('./signup')}
          >Criar Conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  forgotContainer: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});