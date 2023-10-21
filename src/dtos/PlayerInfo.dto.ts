import { PlayerChoice } from "../types/PlayerChoice.type"

export class PlayerIntoDTO {
    id!: number
    currentChoice!: PlayerChoice
    score!: number
    connected!: boolean
}
