import InputStep from "@/components/ui/InputStep";
import ProgressBar from "@/components/ui/ProgressBar";
import { api } from "@/services/api";
import { globalStyles } from "@/styles/global";
import { validateFormField } from "@/utils/validation";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

const steps = ["name", "nickname", "email", "password", "confirmationPassword"];

export default function Onboarding() {
    const router = useRouter();

    const [stepIndex, setStepIndex] = useState(0);

    const [form, setForm] = useState({
        name: "",
        nickname: "",
        email: "",
        password: "",
        confirmationPassword: "",
    });

    const [error, setError] = useState("");

    const currentStep = steps[stepIndex];

    const updateField = (key: string, value: any) => {
        const updatedForm = { ...form, [key]: value };

        setForm(updatedForm);

        const result = validateFormField(key, updatedForm);

        setError(result.error); 
    };

    const next = async () => {
        const result = validateFormField(currentStep, form);

        if (result.error) {
            setError(result.error);
            return;
        }

        setError("");

        if (stepIndex < steps.length - 1) {
            setStepIndex(stepIndex + 1);
        } else {
            await api.post("/users/register", form).then(() => {
                router.replace("/");
            });
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case "name":
                return (
                    <InputStep
                        label="Digite seu nome completo"
                        value={form.name}
                        onChange={(v) => updateField("name", v)}
                        error={error}
                    />
                );
            case "nickname":
                return (
                    <InputStep
                        label="Digite seu nome de usuário"
                        value={form.nickname}
                        onChange={(v) => updateField("nickname", v)}
                        error={error}
                    />
                );
            case "email":
                return (
                    <InputStep
                        label="Digite seu email"
                        value={form.email}
                        onChange={(v) => updateField("email", v)}
                        error={error}
                    />
                );
            case "password":
                return (
                    <InputStep
                        label="Crie uma senha"
                        value={form.password}
                        onChange={(v) => updateField("password", v)}
                        error={error}
                        secure
                    />
                );
            case "confirmationPassword":
                return (
                    <InputStep
                        label="Confirme sua senha"
                        value={form.confirmationPassword}
                        onChange={(v) => updateField("confirmationPassword", v)}
                        error={error}
                        secure
                    />
                );
            default:
                return null;
        }
    };
    
    const progress = (stepIndex + 1) / steps.length;

    const { isValid } = validateFormField(currentStep, form);
     
    return (
        <KeyboardAwareScrollView
            bottomOffset={100}
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
        >
            <View style={{ flex: 1 }}>
                <View style={[globalStyles.container]}>
                    <ProgressBar progress={progress} />

                    {renderStep()}

                    <TouchableOpacity            
                        disabled={!isValid}
                        onPress={next}
                        style={{
                            position: "absolute",
                            bottom: 80,
                            right: 24,
                            width: 64,
                            height: 64,
                            borderRadius: 32,
                            backgroundColor: "#05be43",
                            alignItems: "center",
                            justifyContent: "center",
                            opacity: isValid ? 1 : 0.4,
                            shadowColor: "#000",
                            shadowOpacity: 0.2,
                            shadowRadius: 5,
                            shadowOffset: { width: 0, height: 3 },
                            elevation: 5,
                        }}
                    >
                        <Ionicons name="arrow-forward" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
}