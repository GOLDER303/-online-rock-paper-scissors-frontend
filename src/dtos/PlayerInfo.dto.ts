import { PlayerChoice } from "../types/PlayerChoice.type"

export class PlayerIntoDTO {
    id!: number
    currentChoice!: PlayerChoice
    previousChoice!: PlayerChoice
    score!: number
    connected!: boolean
}
