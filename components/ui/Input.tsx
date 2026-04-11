import { StyleSheet, TextInput } from "react-native";

export default function Input(props: any) {
    return <TextInput style={styles.input} {...props} />;
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 12,
        marginBottom: 12,
        borderRadius: 8,
    }
});