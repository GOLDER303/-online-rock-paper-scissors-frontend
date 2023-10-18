import axios from "axios"
import { RoomCreateResponseDTO } from "./../dtos/RoomCreateResponse.dto"

const API_URL = import.meta.env.VITE_API_URL

export const createRoom = async (): Promise<RoomCreateResponseDTO | undefined> => {
    try {
        const response = await axios.post(`${API_URL}/room`)

        const data = response.data as RoomCreateResponseDTO

        return data
    } catch (err) {
        //TODO:
        console.error(err)
    }
}
