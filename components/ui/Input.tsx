import { StyleSheet, TextInput } from "react-native";

export default function Input(props: any) {
    return <TextInput style={styles.input} {...props} />;
}

const styles = StyleSheet.create({
    input: {
        width: 200,
        height: 40,
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 12,
        marginBottom: 12,
        borderRadius: 8
    }
});