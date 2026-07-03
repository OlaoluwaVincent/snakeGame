import { Colors } from '@/styles/colors';
import { Direction, GestureEventType, type Coordinate } from '@/types/types';
import { checkEatsFood, randomFoodPosition } from '@/utils/checkEatsFood';
import { checkGameOver } from '@/utils/checkGameover';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Food from './Food';
import Header from './Header';
import Snake from './Snake';

const SNAKE_INITIAL_POSITION = [{ x: 5, y: 5 }]
const FOOD_INITIAL_POSITION = { x: 5, y: 20 }
const GAME_BOUNDS = { xMin: 0, xMax: 35, yMin: 1, yMax: 67 }
const MOVE_INTERVAL = 50
const SCORE_INCREMENT = 10

export default function Game() {
    const [direction, setDirection] = useState<Direction>(Direction.Right)
    const [snake, setSnake] = useState<Coordinate[]>(SNAKE_INITIAL_POSITION)
    const [food, setFood] = useState<Coordinate>(FOOD_INITIAL_POSITION)
    const [isGameOver, setIsGameOver] = useState<boolean>(false)
    const [isPaused, setIsPaused] = useState<boolean>(false)
    const [score, setScore] = useState<number>(0)

    useEffect(() => {
        if (!isGameOver && !isPaused) {
            const intervalId = setInterval(() => {
                moveSnake();
            }, MOVE_INTERVAL)
            // Clear Interval
            return () => clearInterval(intervalId);
        }
    }, [snake, isGameOver, isPaused])



    const moveSnake = () => {
        const snakeHead = snake[0];
        const newHead = { ...snakeHead }

        if (checkGameOver(snakeHead, GAME_BOUNDS)) {
            setIsGameOver(prev => !prev)
            return;
        }

        switch (direction) {
            case Direction.Up:
                newHead.y -= 1
                break
            case Direction.Down:
                newHead.y += 1
                break
            case Direction.Left:
                newHead.x -= 1
                break
            case Direction.Right:
                newHead.x += 1
                break
            default:
                break;
        }

        // Grow Snake if food is eaten
        if (checkEatsFood(newHead, food, 2)) {
            setFood(randomFoodPosition(GAME_BOUNDS.xMax, GAME_BOUNDS.yMax))
            setSnake([newHead, ...snake])
            setScore(score + SCORE_INCREMENT);
        } else {
            const newSnake = [newHead, ...snake.slice(0, snake.length - 1)]
            setSnake(newSnake)
        }

    }

    const reloadGame = () => {
        setSnake(SNAKE_INITIAL_POSITION)
        setFood(FOOD_INITIAL_POSITION)
        setIsGameOver(false)
        setIsPaused(false)
        setScore(0)
        setDirection(Direction.Right)
    }

    const pauseGame = () => {
        setIsPaused(!isPaused)
    }

    const pan = Gesture.Pan()
        .runOnJS(true)
        .onUpdate((event: GestureEventType) => {
            if (Math.abs(event.translationX) > Math.abs(event.translationY)) {
                if (event.translationX > 0) {
                    setDirection(Direction.Right)
                }
                else {
                    setDirection(Direction.Left)
                }
            }
            else {
                if (event.translationY > 0) {
                    setDirection(Direction.Down);
                }
                else {
                    setDirection(Direction.Up)
                }
            }
        })

    return (
        <GestureDetector gesture={pan}>
            <SafeAreaView style={styles.container}>
                <Header reloadGame={reloadGame} pauseGame={pauseGame} isPaused={isPaused}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', color: Colors.background }}>Score: {score}</Text>
                </Header>
                <View style={styles.boundaries}>
                    <Snake snake={snake} />
                    <Food x={food.x} y={food.y} />
                </View>
            </SafeAreaView>
        </GestureDetector>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary
    },
    boundaries: {
        flex: 1,
        borderColor: Colors.primary,
        borderWidth: 12,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        backgroundColor: Colors.background
    }
})