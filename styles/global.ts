import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#fafafa",
        width: "100%"
    },
    titleText: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: "center"
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#000",
    },
    subtitle: {
        fontSize: 14,
        color: "#666",
        marginBottom: 32,
    },
    linkText: {
        marginTop: 16,
        color: "blue",
        textAlign: "center"
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 20
    }
});