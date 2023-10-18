import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createRoom } from "../services/RoomService"

const MainPage = () => {
    const navigate = useNavigate()

    const [error, setError] = useState("")

    const handleGameStart = async () => {
        const roomData = await createRoom()

        if (!roomData) {
            setError("Error while starting the game. Try again later.")
            return
        }

        navigate(`/rooms/${roomData.roomId}`)
    }

    return (
        <div className="flex flex-col flex-grow h-screen pt-10 bg-gradient-to-r from-purple-700 to-purple-600 text-white">
            <h1 className=" text-4xl text-center font-bold drop-shadow-lg">Rock Paper Scissors</h1>
            <div className="flex flex-col justify-center items-center flex-grow">
                <button
                    className="group relative block mx-auto mb-8 py-6 px-16 text-xl font-bold uppercase bg-gradient-to-r from-orange-400 to-orange-500 rounded-full shadow-lg shadow-orange-500 hover:shadow-orange-600 transition-shadow"
                    onClick={handleGameStart}
                >
                    {/* Hover background */}
                    <span className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 bg-gradient-to-r from-orange-700 to-orange-600 rounded-full transition-opacity"></span>
                    {/* White outline */}
                    <span className="absolute inset-1 border-white border-2 rounded-full"></span>

                    <span className="relative">Play The Game</span>
                </button>
                {error && <p>{error}</p>}
            </div>
        </div>
    )
}

export default MainPage
