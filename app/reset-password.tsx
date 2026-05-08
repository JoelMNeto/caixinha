import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { api } from "@/services/api";
import { globalStyles } from "@/styles/global";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, View } from "react-native";

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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <View style={[globalStyles.container, { flex: 1 }]}>
                    <Input 
                        placeholder="Nova Senha" 
                        value={password} 
                        onChangeText={setPassword} 
                        secure={true}
                    />

                    <Input 
                        placeholder="Confirmar Nova Senha" 
                        value={confirmPassword} 
                        onChangeText={setConfirmPassword} 
                        secure={true}
                    />

                    <Button title="Redefinir Senha" onPress={handleSubmit} />
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}