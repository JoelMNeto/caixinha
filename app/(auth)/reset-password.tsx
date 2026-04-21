import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { globalStyles } from "@/styles/global";
import { useState } from "react";
import { View } from "react-native";

export default function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = () => {

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