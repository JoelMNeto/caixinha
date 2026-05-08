import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { api } from "@/services/api";
import { globalStyles } from "@/styles/global";
import { validateFormField } from "@/utils/validation";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

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
    
    const updateEmail = (value: string) => {
        const emailResult = validateFormField("email", { email: value });

        if (emailResult.error) {
            setError(emailResult.error);
        } else {
            setEmail(value);
            setError("");
        }
    };

    return (
        <KeyboardAwareScrollView
            bottomOffset={20}
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
        >
            <View style={{ flex: 1 }}>
                <View style={[globalStyles.container, { flex: 1 }]}>
                    <Input 
                        placeholder="Email" 
                        value={email} 
                        onChangeText={(value: string) => updateEmail(value)} 
                        error={error}
                    />

                    <Button title="Enviar" onPress={handleSubmit} />
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
}