import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { api } from "@/services/api";
import { globalStyles } from "@/styles/global";
import { validateFormField } from "@/utils/validation";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, View } from "react-native";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = () => {
        const result = validateFormField("email", { email });

        if (result.error) {
            setError(result.error);
            return;
        }

        setError("");

        api.post("/users/forgot-password", { email }, { skipAuth: true }).then(() => {
            router.push('./valid-confirmation-code?nextScreen=/reset-password');
        });
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <View style={[globalStyles.container, { flex: 1 }]}>
                    <Input 
                        placeholder="Email" 
                        value={email} 
                        onChangeText={(value: string) => {
                            setEmail(value);
                            if (error) setError("");
                        }} 
                        error={error}
                    />

                    <Button title="Enviar" onPress={handleSubmit} />
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}