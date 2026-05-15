import { api } from "@/services/api";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

type TransactionType = "EXPENSE" | "INCOME";

interface TransactionModalProps {
    visible: boolean;
    onClose: () => void;
    onSuccess?: () => void;
    householdId: string;
}

export default function TransactionModal({
    visible,
    onClose,
    onSuccess,
    householdId,
}: TransactionModalProps) {
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState<TransactionType>("EXPENSE");
    const [categoryId, setCategoryId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const amountInputRef = useRef<TextInput>(null);

    useEffect(() => {
        if (visible) {
            setAmount("");
            setDescription("");
            setType("EXPENSE");
            setCategoryId(null);
            setError("");
            setLoading(false);

            setTimeout(() => {
                amountInputRef.current?.focus();
            }, 100);
        }
    }, [visible]);

    const isValidForm = amount.trim() !== "";

    const handleSaveTransaction = async () => {
        if (!isValidForm || !householdId) return;

        setLoading(true);
        setError("");

        try {
            const payload: any = {
                amount: parseFloat(amount),
                description: description.trim() || "Transação",
                type,
                transactionDate: new Date().toISOString(),
            };

            if (categoryId) {
                payload.categoryId = categoryId;
            }

            await api.post(
                `/households/${householdId}/transactions`,
                payload
            );

            onClose();
            onSuccess?.();
        } catch (err: any) {
            setError(
                err.response?.data?.message || "Erro ao salvar transação"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        if (!loading) {
            onClose();
        }
    };

    const formatAmount = (text: string) => {
        const cleaned = text.replace(/[^0-9.]/g, "");
        const parts = cleaned.split(".");

        if (parts.length > 2) {
            return parts[0] + "." + parts[1];
        }
        return cleaned;
    };

    return (
        <Modal visible={visible} transparent animationType="slide">
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <Pressable
                    onPress={handleClose}
                    style={styles.overlay}
                    disabled={loading}
                />

                <View style={styles.modalContent}>
                    <View style={styles.header}>
                        <TouchableOpacity
                            onPress={handleClose}
                            disabled={loading}
                        >
                            <Ionicons
                                name="close"
                                size={24}
                                color="#000"
                                opacity={loading ? 0.5 : 1}
                            />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>
                            Registrar Transação
                        </Text>
                        <View style={{ width: 24 }} />
                    </View>

                    <View style={styles.content}>
                        <View style={styles.section}>
                            <Text style={styles.label}>Valor</Text>
                            <View style={styles.amountInputContainer}>
                                <Text style={styles.currencyPrefix}>R$</Text>
                                <TextInput
                                    ref={amountInputRef}
                                    style={styles.amountInput}
                                    placeholder="0,00"
                                    placeholderTextColor="#CCC"
                                    keyboardType="decimal-pad"
                                    value={amount}
                                    onChangeText={(text) =>
                                        setAmount(formatAmount(text))
                                    }
                                    editable={!loading}
                                    maxLength={12}
                                />
                            </View>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.label}>Descrição</Text>
                            <TextInput
                                style={styles.input}
                                placeholderTextColor="#CCC"
                                value={description}
                                onChangeText={setDescription}
                                editable={!loading}
                                maxLength={100}
                            />
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.label}>Tipo</Text>
                            <View style={styles.typeToggle}>
                                <TouchableOpacity
                                    onPress={() => setType("EXPENSE")}
                                    disabled={loading}
                                    style={[
                                        styles.typeButton,
                                        type === "EXPENSE" &&
                                            styles.typeButtonActive,
                                        type === "EXPENSE" && {
                                            backgroundColor: "#FFE5E5",
                                        },
                                    ]}
                                >
                                    <Ionicons
                                        name="arrow-down"
                                        size={16}
                                        color={
                                            type === "EXPENSE"
                                                ? "#E53E3E"
                                                : "#888"
                                        }
                                    />
                                    <Text
                                        style={[
                                            styles.typeButtonText,
                                            type === "EXPENSE" && {
                                                color: "#E53E3E",
                                                fontWeight: "600",
                                            },
                                        ]}
                                    >
                                        Despesa
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => setType("INCOME")}
                                    disabled={loading}
                                    style={[
                                        styles.typeButton,
                                        type === "INCOME" &&
                                            styles.typeButtonActive,
                                        type === "INCOME" && {
                                            backgroundColor: "#E5F5E5",
                                        },
                                    ]}
                                >
                                    <Ionicons
                                        name="arrow-up"
                                        size={16}
                                        color={
                                            type === "INCOME"
                                                ? "#22863A"
                                                : "#888"
                                        }
                                    />
                                    <Text
                                        style={[
                                            styles.typeButtonText,
                                            type === "INCOME" && {
                                                color: "#22863A",
                                                fontWeight: "600",
                                            },
                                        ]}
                                    >
                                        Receita
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {error && (
                            <View style={styles.errorContainer}>
                                <Ionicons
                                    name="alert-circle"
                                    size={16}
                                    color="#E53E3E"
                                />
                                <Text style={styles.errorText}>{error}</Text>
                            </View>
                        )}
                    </View>

                    <View style={styles.footer}>
                        <TouchableOpacity
                            onPress={handleSaveTransaction}
                            disabled={!isValidForm || loading}
                            style={[
                                styles.saveButton,
                                (!isValidForm || loading) && {
                                    opacity: 0.5,
                                },
                            ]}
                        >
                            {loading ? (
                                <ActivityIndicator
                                    size="small"
                                    color="white"
                                />
                            ) : (
                                <Text style={styles.saveButtonText}>
                                    Salvar Transação
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    overlay: {
        flex: 1,
    },
    modalContent: {
        backgroundColor: "#fafafa",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 20,
        maxHeight: "80%",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#000",
    },
    content: {
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    section: {
        marginBottom: 24,
    },
    label: {
        fontSize: 12,
        fontWeight: "600",
        color: "#888",
        marginBottom: 8,
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },
    amountInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 2,
        borderBottomColor: "#05be43",
    },
    currencyPrefix: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#05be43",
        marginRight: 8,
    },
    amountInput: {
        flex: 1,
        fontSize: 32,
        fontWeight: "bold",
        color: "#000",
        paddingVertical: 12,
        borderWidth: 0
    },
    input: {
        backgroundColor: "#fff",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#f0f0f0",
        paddingHorizontal: 12,
        paddingVertical: 12,
        fontSize: 14,
        color: "#000",
    },
    typeToggle: {
        flexDirection: "row",
        gap: 12,
    },
    typeButton: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#f0f0f0",
        paddingVertical: 12,
        gap: 8,
    },
    typeButtonActive: {
        borderColor: "transparent",
    },
    typeButtonText: {
        fontSize: 14,
        fontWeight: "500",
        color: "#888",
    },
    errorContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFE5E5",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        gap: 8,
    },
    errorText: {
        fontSize: 12,
        color: "#E53E3E",
        flex: 1,
    },
    footer: {
        paddingHorizontal: 20,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: "#f0f0f0",
    },
    saveButton: {
        backgroundColor: "#05be43",
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: "center",
        justifyContent: "center",
    },
    saveButtonText: {
        fontSize: 14,
        fontWeight: "600",
        color: "white",
    },
});
