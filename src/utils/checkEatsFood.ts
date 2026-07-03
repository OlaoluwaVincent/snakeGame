import type { Coordinate } from "@/types/types";

export const checkEatsFood = (head: Coordinate, food: Coordinate, area: number) => {

    const distanceBetweenFoodAndSnakeX = Math.abs(head.x - food.x)
    const distanceBetweenFoodAndSnakeY = Math.abs(head.y - food.y)

    return (
        distanceBetweenFoodAndSnakeX < area &&
        distanceBetweenFoodAndSnakeY < area
    )
}

export const randomFoodPosition = (maxWidth: number, maxHeight: number): Coordinate => {
    const x = Math.floor(Math.random() * maxWidth)
    const y = Math.floor(Math.random() * maxHeight)

    return { x, y }
}