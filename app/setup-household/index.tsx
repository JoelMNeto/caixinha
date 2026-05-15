import InputStep from "@/components/ui/InputStep";
import { api } from "@/services/api";
import { globalStyles } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

type Mode = "create" | "join";

export default function SetupHousehold() {
    const router = useRouter();

    const [mode, setMode] = useState<Mode>("create");
    const [householdName, setHouseholdName] = useState("");
    const [householdId, setHouseholdId] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const validateInput = () => {
        if (mode === "create") {
            if (householdName.trim().length < 3) {
                setError("Nome da casa deve ter pelo menos 3 caracteres");
                return false;
            }
        } else {
            if (householdId.trim().length === 0) {
                setError("ID da casa é obrigatório");
                return false;
            }
        }
        return true;
    };

    const handleCreateHousehold = async () => {
        if (!validateInput()) return;

        setLoading(true);
        setError("");

        const response = await api.post("/households", {
            name: householdName.trim(),
        });

        const createdHouseholdId = String(response.data.id);

        await AsyncStorage.setItem("householdId", createdHouseholdId);
        
        router.replace("./home");
        setLoading(false);
    };

    const handleJoinHousehold = async () => {
        if (!validateInput()) return;

        setLoading(true);
        setError("");

        try {
            const response = await api.get(`/households/${householdId.trim()}`);
            
            const joinHouseholdId = String(response.data.id);

            await AsyncStorage.setItem("householdId", joinHouseholdId);
            
            router.replace("./home");
        } catch (err: any) {
            setError(err.response?.data?.message || "Casa não encontrada");
        } finally {
            setLoading(false);
        }
    };

    const isButtonValid = mode === "create" 
        ? householdName.trim().length >= 3 
        : householdId.trim().length > 0;

    const isButtonDisabled = !isButtonValid || loading;

    return (
        <KeyboardAwareScrollView
            bottomOffset={100}
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
        >
            <View style={{ flex: 1 }}>
                <View style={[globalStyles.container, styles.container]}>
                    <Text style={globalStyles.subtitle}>
                        Crie uma nova casa ou entre em uma existente
                    </Text>

                    <View style={styles.modeToggle}>
                        <Pressable
                            onPress={() => {
                                setMode("create");
                                setError("");
                            }}
                            style={[
                                styles.modeButton,
                                mode === "create" && styles.modeButtonActive,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.modeButtonText,
                                    mode === "create" && styles.modeButtonTextActive,
                                ]}
                            >
                                Criar Nova
                            </Text>
                        </Pressable>

                        <Pressable
                            onPress={() => {
                                setMode("join");
                                setError("");
                            }}
                            style={[
                                styles.modeButton,
                                mode === "join" && styles.modeButtonActive,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.modeButtonText,
                                    mode === "join" && styles.modeButtonTextActive,
                                ]}
                            >
                                Entrar Existente
                            </Text>
                        </Pressable>
                    </View>

                    {mode === "create" ? (
                        <InputStep
                            label="Nome da Casa"
                            value={householdName}
                            onChange={(v) => {
                                setHouseholdName(v);
                                setError("");
                            }}
                            error={error}
                        />
                    ) : (
                        <InputStep
                            label="ID da Casa"
                            value={householdId}
                            onChange={(v) => {
                                setHouseholdId(v);
                                setError("");
                            }}
                            error={error}
                        />
                    )}

                    <TouchableOpacity
                        disabled={isButtonDisabled}
                        onPress={mode === "create" ? handleCreateHousehold : handleJoinHousehold}
                        style={{
                            position: "absolute",
                            bottom: 24,
                            right: 24,
                            width: 64,
                            height: 64,
                            borderRadius: 32,
                            backgroundColor: "#05be43",
                            alignItems: "center",
                            justifyContent: "center",
                            opacity: isButtonDisabled ? 0.4 : 1,
                            shadowColor: "#000",
                            shadowOpacity: 0.2,
                            shadowRadius: 5,
                            shadowOffset: { width: 0, height: 3 },
                            elevation: 5,
                        }}
                    >
                        {loading ? (
                            <Ionicons name="hourglass" size={24} color="white" />
                        ) : (
                            <Ionicons name="arrow-forward" size={24} color="white" />
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-start",
        paddingTop: 40,
    },
    modeToggle: {
        flexDirection: "row",
        gap: 12,
        marginBottom: 32,
        backgroundColor: "#f0f0f0",
        borderRadius: 8,
        padding: 4,
    },
    modeButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center",
    },
    modeButtonActive: {
        backgroundColor: "#05be43",
    },
    modeButtonText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#666",
    },
    modeButtonTextActive: {
        color: "#fff",
    },
});
