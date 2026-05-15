import { StyleSheet, Text, View } from "react-native";
import Input from "./Input";

export interface InputStepProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
    secure?: boolean;
}

export default function InputStep({
    label,
    value,
    onChange,
    error,
    keyboardType,
    secure
}: InputStepProps) {
    return (
        <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>
                {label}
            </Text>

            <Input
                value={value}
                onChangeText={onChange}
                autoFocus
                keyboardType={keyboardType}
                secure={secure}
                error={error}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
        flex: 1,
        padding: 24
    },
    inputLabel: {
        fontSize: 24,
        marginBottom: 20
    }
});