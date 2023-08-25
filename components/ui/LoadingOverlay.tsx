import { ActivityIndicator, StyleSheet, View } from "react-native"
import { Colors } from "../../utils/colors"

type LoadingOverlayProps = {
    size: number,
    color: string
}

export const LoadingOverlay = ({ size, color }: LoadingOverlayProps) => {
    return (<View style={styles.container}>
        <ActivityIndicator size={size} color={color} />
    </View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",

    }
})