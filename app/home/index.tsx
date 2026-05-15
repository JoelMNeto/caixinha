import TransactionModal from "@/components/TransactionModal";
import { api } from "@/services/api";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Transaction {
    id: string;
    description: string;
    amount: number;
    type: "INCOME" | "EXPENSE";
    date: string;
}

interface Summary {
    totalExpenses: number;
}

export default function Home() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [summary, setSummary] = useState<Summary | null>(null);

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);
    const [householdId, setHouseholdId] = useState<string | null>(null);

    const loadData = useCallback(async () => {
        try {
            setLoading(true);

            const storedId = await AsyncStorage.getItem("householdId");

            if (!storedId) return;

            setHouseholdId(storedId);

            const [transactionsRes, summaryRes] = await Promise.all([
                api.get(`/households/${storedId}/transactions`),
                api.get(`/households/${storedId}/summary`),
            ]);

            setTransactions(transactionsRes.data || []);
            setSummary(summaryRes.data);
        } catch (error) {
            console.log("Erro ao carregar dashboard", error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [loadData])
    );

    const onRefresh = async () => {
        setRefreshing(true);
        await loadData();
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(value);
    };

    const formatDate = (date: string) => {
        if (!date) return "--/--/----";

        const parts = date.split("T")[0]?.split("-");

        if (!parts || parts.length !== 3) {
            return "--/--/----";
        }

        const [year, month, day] = parts;

        return `${day}/${month}/${year}`;
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.center}>
                <ActivityIndicator size="large" color="#05be43" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.label}>Total gasto no mês</Text>

                <Text style={styles.total}>
                    {formatCurrency(summary?.totalExpenses || 0)}
                </Text>
            </View>

            <FlatList
                data={transactions}
                keyExtractor={(item) => item.id}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                contentContainerStyle={styles.list}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text>Nenhuma transação encontrada</Text>
                    </View>
                }
                renderItem={({ item }) => (
                    <View style={styles.transaction}>
                        <View style={styles.transactionLeft}>
                            <Ionicons
                                name={
                                    item.type === "EXPENSE"
                                        ? "arrow-down"
                                        : "arrow-up"
                                }
                                size={18}
                                color={
                                    item.type === "EXPENSE"
                                        ? "#E53E3E"
                                        : "#22863A"
                                }
                            />

                            <View>
                                <Text style={styles.description}>
                                    {item.description}
                                </Text>

                                <Text style={styles.date}>
                                    {formatDate(item.date)}
                                </Text>
                            </View>
                        </View>

                        <Text
                            style={[
                                styles.amount,
                                {
                                    color:
                                        item.type === "EXPENSE"
                                            ? "#E53E3E"
                                            : "#22863A",
                                },
                            ]}
                        >
                            {item.type === "EXPENSE" ? "-" : "+"}
                            {formatCurrency(item.amount)}
                        </Text>
                    </View>
                )}
            />

            <TouchableOpacity
                style={styles.fab}
                onPress={() => setModalVisible(true)}
            >
                <Ionicons name="add" size={28} color="#fff" />
            </TouchableOpacity>

            {householdId && (
                <TransactionModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    onSuccess={loadData}
                    householdId={householdId}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },

    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    header: {
        padding: 24,
        backgroundColor: "#05be43",
    },

    label: {
        color: "#fff",
        fontSize: 14,
        marginBottom: 8,
    },

    total: {
        color: "#fff",
        fontSize: 32,
        fontWeight: "bold",
    },

    list: {
        padding: 16,
    },

    transaction: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },

    transactionLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },

    description: {
        fontSize: 16,
        fontWeight: "500",
    },

    date: {
        fontSize: 12,
        color: "#888",
        marginTop: 4,
    },

    amount: {
        fontSize: 16,
        fontWeight: "bold",
    },

    emptyContainer: {
        marginTop: 40,
        alignItems: "center",
    },

    fab: {
        position: "absolute",
        right: 24,
        bottom: 24,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#05be43",
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
    },
});