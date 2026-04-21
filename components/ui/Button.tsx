import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function Button({title, onPress}: any) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        marginTop: 20,
        width: 200,
        backgroundColor: "#007bff",
        padding: 14,
        borderRadius: 8,
        alignItems: "center",
    },
    text: {
        color: "#fff",
        fontWeight: "bold",
    }
});