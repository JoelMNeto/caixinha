import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { api } from "@/services/api";
import { globalStyles } from "@/styles/global";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

export default function ResetPassword(confirmationCode: string) {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const router = useRouter();

    const handleSubmit = async () => {
        await api.post("/users/reset-password", { password, confirmPassword, confirmationCode }).then(() => {
            alert("Senha redefinida com sucesso!");
            router.push("/");
        });
    }

    return (
        <View style={globalStyles.container}>
            <Input 
                placeholder="Nova Senha" 
                value={password} 
                onChangeText={setPassword} 
                secureTextEntry
            />

            <Input 
                placeholder="Confirmar Nova Senha" 
                value={confirmPassword} 
                onChangeText={setConfirmPassword} 
                secureTextEntry
            />

            <Button title="Redefinir Senha" onPress={handleSubmit} />
        </View>
    );
}