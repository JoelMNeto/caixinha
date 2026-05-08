import Button from "@/components/ui/Button";
import { globalStyles } from "@/styles/global";
import { Text } from "@react-navigation/elements";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useRef, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

export default function ValidConfirmationCode() {
    const { nextScreen } = useLocalSearchParams<{ nextScreen: string }>();
    const [confirmationCode, setConfirmationCode] = useState("");
    const inputRef = useRef<TextInput>(null);

    const router = useRouter();

    const handleSubmit = () => {
        router.push({ pathname: nextScreen as any, params: { confirmationCode } });
    }

    return (
        <KeyboardAwareScrollView
            bottomOffset={20}
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
        >
            <View style={{ flex: 1 }}>
                <View style={[globalStyles.container, { flex: 1 }]}>
                    <TouchableOpacity onPress={() => inputRef.current?.focus()}>
                        <View style={styles.inputContainer}>
                            {[...Array(6)].map((_, index) => (
                                <View key={index} style={styles.box}>
                                    <Text style={styles.text}>
                                        {confirmationCode[index] || ""}
                                    </Text>
                                </View>
                            ))}
                        </View>

                        <TextInput
                            ref={inputRef}
                            value={confirmationCode}
                            onChangeText={setConfirmationCode}
                            maxLength={6}
                            keyboardType="numeric"
                            style={styles.hiddenInput}
                        />
                    </TouchableOpacity>

                    <Button title="Confirmar" onPress={handleSubmit} />
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  box: {
    width: 45,
    height: 55,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
  },
});