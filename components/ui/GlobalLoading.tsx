import { useLoadingStore } from "@/services/loadingStore";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function GlobalLoading() {
    const count = useLoadingStore((state) => state.count);

    if (count === 0) {
        return null;
    }

    return (
        <View style={styles.overlay}>
            <ActivityIndicator size="large" color="blue" />
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
    }
});