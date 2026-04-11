import { useRouter } from "@/.expo/types/router";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { globalStyles } from "@/styles/global";
import { useState } from "react";
import { Text, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {

  }
  
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.titleText}>Login</Text>

      <Input placeholder="Email" value={email} onChangeText={setEmail} />

      <Input 
        placeholder="Password" 
        secureTextEntry 
        value={password} 
        onChangeText={setPassword} 
      />

      <Button title="Entrar" onPress={handleLogin} />

      <Text style={globalStyles.linkText} onPress={() => router.push('./forgot-password')}>
        Esqueci minha senha
      </Text>

      <Text style={globalStyles.linkText} onPress={() => router.push('./signup')}>
        Criar uma conta
      </Text>
    </View>
  );
}