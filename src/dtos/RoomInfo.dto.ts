import { PlayerIntoDTO } from "./PlayerInfo.dto"

export class RoomInfoDTO {
    roomId!: number
    round!: number
    players!: PlayerIntoDTO[]
}
