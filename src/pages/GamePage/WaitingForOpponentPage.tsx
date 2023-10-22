import { useState } from "react"

const WaitingForOpponentPage = () => {
    const [isUrlCopied, setIsUrlCopied] = useState<boolean>(false)

    const handleRoomUrlCopy = () => {
        navigator.clipboard.writeText(window.location.href)

        setIsUrlCopied(true)
    }

    return (
        <div className="flex h-screen flex-col justify-center items-center pt-8 bg-gradient-to-r from-purple-700 to-purple-600 text-white">
            <h1 className="mb-40 text-4xl text-center font-bold drop-shadow-lg">
                Waiting for the opponent to connect . . .
            </h1>

            <div
                className="group relative mb-8 py-4 px-16 border-2 border-white rounded-lg cursor-pointer shadow-lg"
                onClick={handleRoomUrlCopy}
            >
                <div className="absolute top-0 left-0 w-full h-full bg-white opacity-25 group-hover:opacity-20"></div>
                {!isUrlCopied ? (
                    <p className="relative text-xl">{window.location.href}</p>
                ) : (
                    <p className="relative text-xl">Copied!</p>
                )}
            </div>
        </div>
    )
}

export default WaitingForOpponentPage
