import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { api } from "@/services/api";
import { globalStyles } from "@/styles/global";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

export default function Signup() {
    const router = useRouter();

    const [password, setPassword] = useState("");
    const [confirmationPassword, setConfirmationPassword] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [nickname, setNickname] = useState("");

    const handleSubmit = async () => {
        const request = {
            email,
            password,
            confirmationPassword,
            name,
            nickname
        };

        await api.post("/users/register", request, { skipAuth: true });

        router.push('./valid-confirmation-code');
    }
     
    return (
        <View style={globalStyles.container}>
            <Input 
                placeholder="E-mail" 
                value={email} 
                onChangeText={setEmail} 
            />

            <Input 
                placeholder="Nome Completo" 
                value={name} 
                onChangeText={setName} 
            />

            <Input 
                placeholder="Nome de Usuário" 
                value={nickname} 
                onChangeText={setNickname} 
            />

            <Input 
                placeholder="Senha" 
                value={password} 
                onChangeText={setPassword} 
                secureTextEntry
            />
            
            <Input 
                placeholder="Confirmar Senha" 
                value={confirmationPassword} 
                onChangeText={setConfirmationPassword} 
                secureTextEntry
            />

            <Button title="Cadastrar" onPress={handleSubmit} />
        </View>
    );
}