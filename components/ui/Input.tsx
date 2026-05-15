import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export interface InputProps {
    [key: string]: any;
    secure?: boolean;
    error?: string;
}

export default function Input(props: InputProps) {
    const [focused, setFocused] = useState(false);

    const [hidePassword, setHidePassword] = useState(true);
    
    return (
        <View style={styles.inputWrapper}>
            <TextInput 
                onFocus={() => setFocused(true)} 
                onBlur={() => setFocused(false)} 
                underlineColorAndroid="transparent"
                secureTextEntry={props.secure && hidePassword}
                style={[styles.input, { borderColor: focused ? 'green' : 'gray' }]} 
                {...props} 
            />

            <View style={styles.inputErrorWrapper}>
                {props.error ? (
                    <Text style={styles.inputErrorText}>
                        {props.error}
                    </Text>
                ) : null}
            </View> 

            {props.secure && (
                <TouchableOpacity
                    onPress={() => setHidePassword((prev) => !prev)}
                    style={{
                        position: "absolute",
                        right: 0,
                        top: 10,
                        marginRight: 12,
                        marginTop: 2,
                    }}
                >
                    <Ionicons
                        name={hidePassword ? "eye" : "eye-off"}
                        size={22}
                        color="#888"
                    />
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    inputWrapper: {
        width: '100%',
        position: 'relative',
        alignSelf: 'stretch',
    },
    input: {
        alignSelf: 'stretch',
        height: 50,
        borderWidth: 1,
        borderBottomWidth: 1,
        backgroundColor: 'white',
        paddingLeft: 12,
        borderRadius: 8
    },
    inputErrorWrapper: {
        marginLeft: 5,
        marginBottom: 16,
    },
    inputErrorText: {
        color: "red"
    }
});