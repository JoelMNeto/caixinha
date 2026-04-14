import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { globalStyles } from "@/styles/global";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const router = useRouter();

    const handleSubmit = () => {

        router.push('./valid-confirmation-code');
    }

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.titleText}>Recuperar Senha</Text>

            <Input 
                placeholder="Email" 
                value={email} 
                onChangeText={setEmail} 
            />

            <Button title="Enviar" onPress={handleSubmit} />
        </View>
    );
}