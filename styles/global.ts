import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#fafafa"
    },
    titleText: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: "center"
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