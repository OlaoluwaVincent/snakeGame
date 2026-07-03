import { type Coordinate } from '@/types/types'
import { Fragment } from 'react'
import { StyleSheet, View } from 'react-native'

interface SnakeProps {
    snake: Coordinate[]
}

export default function Snake({ snake }: SnakeProps) {
    return (
        <Fragment>
            {snake.map((segment: Coordinate, index: number) => (
                <View
                    key={index}
                    style={[
                        {
                            left: segment.x * 10,
                            top: segment.y * 10,
                        },
                        styles.snake
                    ]}
                />
            ))}
        </Fragment>
    )
}

const styles = StyleSheet.create({
    snake: {
        position: "absolute",
        width: 10,
        height: 10,
        backgroundColor: "#000",
        borderRadius: 5
    }
})