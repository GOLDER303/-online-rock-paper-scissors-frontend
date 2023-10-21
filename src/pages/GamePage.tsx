import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { io } from "socket.io-client"
import { RoomInfoDTO } from "../dtos/RoomInfo.dto"
import paperIcon from "../img/icons/paper-icon.svg"
import rockIcon from "../img/icons/rock-icon.svg"
import scissorsIcon from "../img/icons/scissors-icon.svg"

const GamePage = () => {
    const { roomId } = useParams()

    const [playerId, setPlayerId] = useState<number>()
    const [roomInfo, setRoomInfo] = useState<RoomInfoDTO>()

    const [playerScore, setPlayerScore] = useState<number>(0)
    const [opponentScore, setOpponentScore] = useState<number>(0)

    const [isOpponentConnected, setIsOpponentConnected] = useState<boolean>(false)

    useEffect(() => {
        const onRoomJoined = (payload: { playerId: number }) => {
            setPlayerId(payload.playerId)
        }

        const onRoomUpdate = (payload: RoomInfoDTO) => {
            setRoomInfo(payload)
        }

        const onError = (error: string) => {
            //TODO:
            console.log(error)
        }

        const socket = io(import.meta.env.VITE_API_URL)

        socket.on("room:joined", onRoomJoined)
        socket.on("room:update", onRoomUpdate)
        socket.on("error", onError)

        socket.emit("room:join", roomId)

        return () => {
            socket.off("room:joined", onRoomJoined)
            socket.off("room:update", onRoomUpdate)
            socket.off("error", onError)

            socket.emit("room:leave", playerId)
            socket.disconnect()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (!roomInfo || !playerId) {
            return
        }

        const playerScore = roomInfo.players.find((playerInfo) => playerInfo.id == playerId)?.score
        const opponentInfo = roomInfo.players.find((playerInfo) => playerInfo.id != playerId)

        if (typeof playerScore === "undefined" || !opponentInfo) {
            return
        }

        setIsOpponentConnected(opponentInfo.connected)

        //TODO: opponentChoice

        setPlayerScore(playerScore)
        setOpponentScore(opponentInfo.score)
    }, [roomInfo, playerId])

    return (
        <div className="flex flex-col h-screen pt-8 bg-gradient-to-r from-purple-700 to-purple-600 text-white">
            <h1 className="text-4xl text-center font-bold drop-shadow-lg">Round 1</h1>

            <div className="flex flex-col flex-1 lg:flex-row-reverse">
                <div className="flex flex-col justify-evenly items-center flex-1 lg:justify-center">
                    <h2 className="text-center text-2xl font-bold lg:mb-32 lg:text-3xl">Opponent's Score: 0</h2>
                    <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-orange-300 lg:h-48 lg:w-48"></div>
                </div>

                <div className="flex flex-col justify-evenly flex-1 lg:justify-center">
                    <h2 className="text-center text-2xl font-bold lg:mb-32 lg:text-3xl">Your Score: 0</h2>

                    <div className="flex h-48 items-center justify-center gap-5 lg:justify-evenly">
                        <div className="w-full max-w-[150px]">
                            {/* https://www.flaticon.com/free-icons/rock */}
                            <img
                                src={rockIcon}
                                alt="rock icon"
                            />
                            <p className="mt-2 text-2xl font-bold text-center">Rock</p>
                        </div>
                        <div className="w-full max-w-[150px]">
                            {/* https://www.flaticon.com/free-icons/paper */}
                            <img
                                src={paperIcon}
                                alt="paper icon"
                            />
                            <p className="mt-2 text-2xl font-bold text-center">Paper</p>
                        </div>
                        <div className="w-full max-w-[150px]">
                            {/* https://www.flaticon.com/free-icons/scissors */}
                            <img
                                src={scissorsIcon}
                                alt="scissors icon"
                            />
                            <p className="mt-2 text-2xl font-bold text-center">Scissors</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GamePage
