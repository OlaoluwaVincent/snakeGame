import type { Coordinate } from '@/types/types'
import { StyleSheet, Text } from 'react-native'



export default function Food({ x, y }: Coordinate) {
    return (
        <Text style={{ top: y * 10, left: x * 10, fontSize: 20 }}>🍎</Text>
    )
}

const styles = StyleSheet.create({
    food: {
        width: 10,
        height: 10,
        borderRadius: 5,
        position: "absolute",
    }
})