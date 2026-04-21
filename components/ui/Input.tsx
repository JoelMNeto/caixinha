import { useState } from "react";
import { StyleSheet, TextInput } from "react-native";

export default function Input(props: any) {
    const [focused, setFocused] = useState(false);
    
    return (
        <TextInput 
            onFocus={() => setFocused(true)} 
            onBlur={() => setFocused(false)} 
            underlineColorAndroid="transparent"
            style={[styles.input, { borderColor: focused ? 'blue' : 'gray' }]} 
            {...props} 
        />
    );
}

const styles = StyleSheet.create({
    input: {
        alignSelf: 'stretch',
        height: 50,
        borderWidth: 1,
        borderBottomWidth: 1,
        backgroundColor: 'white',
        paddingLeft: 12,
        marginBottom: 16,
        borderRadius: 8
    }
});