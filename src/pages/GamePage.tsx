import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Socket, io } from "socket.io-client"
import { RoomInfoDTO } from "../dtos/RoomInfo.dto"
import paperIcon from "../img/icons/paper-icon.svg"
import rockIcon from "../img/icons/rock-icon.svg"
import scissorsIcon from "../img/icons/scissors-icon.svg"
import { PlayerChoice } from "../types/PlayerChoice.type"

const GamePage = () => {
    const { roomId } = useParams()

    const [socket, setSocket] = useState<Socket>()

    const [playerId, setPlayerId] = useState<number>()
    const [roomInfo, setRoomInfo] = useState<RoomInfoDTO>()

    const [playerScore, setPlayerScore] = useState<number>(0)
    const [opponentScore, setOpponentScore] = useState<number>(0)

    const [isOpponentConnected, setIsOpponentConnected] = useState<boolean>(false)

    const [opponentChoice, setOpponentChoice] = useState<PlayerChoice>("NONE")
    const [currentChoice, setCurrentChoice] = useState<PlayerChoice>("NONE")

    const [showResults, setShowResults] = useState<boolean>(false)

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

        const newSocket = io(import.meta.env.VITE_API_URL)

        newSocket.on("room:joined", onRoomJoined)
        newSocket.on("room:update", onRoomUpdate)
        newSocket.on("error", onError)

        newSocket.emit("room:join", roomId)

        setSocket(newSocket)

        return () => {
            newSocket.off("room:joined", onRoomJoined)
            newSocket.off("room:update", onRoomUpdate)
            newSocket.off("error", onError)

            newSocket.emit("room:leave", playerId)
            newSocket.disconnect()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (!roomInfo || !playerId) {
            return
        }

        const playerInfo = roomInfo.players.find((playerInfo) => playerInfo.id === playerId)
        const opponentInfo = roomInfo.players.find((playerInfo) => playerInfo.id !== playerId)

        if (typeof playerInfo === "undefined" || !opponentInfo) {
            return
        }

        setIsOpponentConnected(opponentInfo.connected)

        if (playerScore !== playerInfo.score || opponentScore !== opponentInfo.score) {
            setShowResults(true)

        setPlayerScore(playerInfo.score)
        setOpponentScore(opponentInfo.score)
            setTimeout(() => {
                setOpponentChoice(opponentInfo.currentChoice)
                setCurrentChoice(playerInfo.currentChoice)

                setShowResults(false)
            }, 3500)

            return
        }

        setOpponentChoice(opponentInfo.currentChoice)
        setCurrentChoice(playerInfo.currentChoice)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roomInfo, playerId])

    const handlePlayerChoice = (playerChoice: PlayerChoice) => {
        if (!socket) {
            return
        }

        socket.emit("room:choice", playerChoice)

        setCurrentChoice(playerChoice)
    }

    return (
        <>
            {!isOpponentConnected ? (
                <h1>Waiting for opponent {isOpponentConnected}</h1>
            ) : (
                <div className="flex flex-col h-screen pt-8 bg-gradient-to-r from-purple-700 to-purple-600 text-white">
                    <h1 className="text-4xl text-center font-bold drop-shadow-lg">Round 1</h1>

                    <div className="flex flex-col flex-1 lg:flex-row-reverse">
                        <div className="flex flex-col justify-evenly items-center flex-1 lg:justify-center">
                            <h2 className="text-center text-2xl font-bold lg:mb-32 lg:text-3xl">
                                Opponent's Score: {opponentScore}
                            </h2>

                            <div className="flex h-52 flex-col justify-between items-center">
                                {!showResults ? (
                                    <>
                                        {opponentChoice === "NONE" ? (
                                            <>
                                                <div className="animate-spin rounded-full h-36 w-36 border-t-4 border-orange-300"></div>
                                                <h3 className="text-xl font-bold text-center lg:text-2xl">
                                                    Waiting for opponent choice
                                                </h3>
                                            </>
                                        ) : (
                                            <>
                                                <FontAwesomeIcon
                                                    icon={faCheck}
                                                    className="w-28 h-28 lg:w-32 lg:h-32"
                                                />
                                                <h3 className="text-xl font-bold text-center lg:text-2xl">
                                                    Opponent made a choice
                                                </h3>
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <h3 className="text-xl font-bold text-center lg:text-2xl">
                                        Opponent choice: {opponentChoice}
                                    </h3>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col justify-evenly flex-1 lg:justify-center">
                            <h2 className="text-center text-2xl font-bold lg:mb-32 lg:text-3xl">
                                Your Score: {playerScore}
                            </h2>

                            <div className="flex h-48 items-center justify-center gap-5 lg:justify-evenly">
                                {(currentChoice === "NONE" || currentChoice === "ROCK") && (
                                    <div
                                        className="flex w-full h-52 flex-col justify-between max-w-[150px]"
                                        onClick={() => {
                                            if (currentChoice !== "NONE") {
                                                return
                                            }
                                            handlePlayerChoice("ROCK")
                                        }}
                                    >
                                        {/* https://www.flaticon.com/free-icons/rock */}
                                        <img
                                            src={rockIcon}
                                            alt="rock icon"
                                        />
                                        <p className="text-xl font-bold text-center lg:text-2xl">Rock</p>
                                    </div>
                                )}

                                {(currentChoice === "NONE" || currentChoice === "PAPER") && (
                                    <div
                                        className="flex w-full h-52 flex-col justify-between max-w-[150px]"
                                        onClick={() => {
                                            if (currentChoice !== "NONE") {
                                                return
                                            }
                                            handlePlayerChoice("PAPER")
                                        }}
                                    >
                                        {/* https://www.flaticon.com/free-icons/paper */}
                                        <img
                                            src={paperIcon}
                                            alt="paper icon"
                                        />
                                        <p className="text-xl font-bold text-center lg:text-2xl">Paper</p>
                                    </div>
                                )}

                                {(currentChoice === "NONE" || currentChoice === "SCISSORS") && (
                                    <div
                                        className="flex w-full h-52 flex-col justify-between max-w-[150px]"
                                        onClick={() => {
                                            if (currentChoice !== "NONE") {
                                                return
                                            }
                                            handlePlayerChoice("SCISSORS")
                                        }}
                                    >
                                        {/* https://www.flaticon.com/free-icons/scissors */}
                                        <img
                                            src={scissorsIcon}
                                            alt="scissors icon"
                                        />
                                        <p className="text-xl font-bold text-center lg:text-2xl">Scissors</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default GamePage
