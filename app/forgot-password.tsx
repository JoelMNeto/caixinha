import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { api } from "@/services/api";
import { globalStyles } from "@/styles/global";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const router = useRouter();

    const handleSubmit = () => {
        api.post("/users/forgot-password", { email }, { skipAuth: true }).then(() => {
            router.push('./valid-confirmation-code?nextScreen=/reset-password');
        });
    };

    return (
        <View style={globalStyles.container}>
            <Input 
                placeholder="Email" 
                value={email} 
                onChangeText={setEmail} 
            />

            <Button title="Enviar" onPress={handleSubmit} />
        </View>
    );
}