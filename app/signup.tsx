import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { globalStyles } from "@/styles/global";
import { useState } from "react";
import { Text, View } from "react-native";

export default function Signup() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");

    const handleSubmit = () => {
        
    }
        
    <View style={globalStyles.container}>
        <Text style={globalStyles.titleText}>Cadastro</Text>

        <Input 
            placeholder="E-mail" 
            value={email} 
            onChangeText={setEmail} 
        />

        <Input 
            placeholder="Nome Completo" 
            value={fullName} 
            onChangeText={setFullName} 
        />

        <Input 
            placeholder="Nome de Usuário" 
            value={username} 
            onChangeText={setUsername} 
        />

        <Input 
            placeholder="Senha" 
            value={password} 
            onChangeText={setPassword} 
            secureTextEntry
        />
         
        <Input 
            placeholder="Confirmar Senha" 
            value={confirmPassword} 
            onChangeText={setConfirmPassword} 
            secureTextEntry
        />

        <Button title="Cadastrar" onPress={handleSubmit} />
    </View>
}