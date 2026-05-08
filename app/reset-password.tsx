import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { api } from "@/services/api";
import { globalStyles } from "@/styles/global";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

export default function ResetPassword() {
    const { confirmationCode } = useLocalSearchParams<{ confirmationCode: string }>();
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
        <KeyboardAwareScrollView
            bottomOffset={20}
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
        >
            <View style={{ flex: 1 }}>
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
            </View>
        </KeyboardAwareScrollView>
    );
}