import { useState } from "react"

const WaitingForOpponentPage = () => {
    const [isUrlCopied, setIsUrlCopied] = useState<boolean>(false)

    const handleRoomUrlCopy = () => {
        navigator.clipboard.writeText(window.location.href)

        setIsUrlCopied(true)
    }

    return (
        <div className="flex h-screen flex-col justify-center items-center pt-8 bg-gradient-to-r from-purple-700 to-purple-600 text-white">
            <h1 className="mb-20 px-4 text-3xl text-center font-bold drop-shadow-lg lg:text-4xl lg:mb-52">
                Waiting for the opponent to connect <span className="whitespace-nowrap">. . .</span>
            </h1>

            <div
                className="group relative mb-8 py-3 px-8 border-2 border-white rounded-lg cursor-pointer shadow-lg lg:px-16 lg:py-5"
                onClick={handleRoomUrlCopy}
            >
                <div className="absolute top-0 left-0 w-full h-full bg-white opacity-25 group-hover:opacity-20"></div>
                {!isUrlCopied ? (
                    <p className="relative text-lg text-center lg:text-xl">{window.location.href}</p>
                ) : (
                    <p className="relative text-lg text-center lg:text-xl">Copied!</p>
                )}
            </div>
        </div>
    )
}

export default WaitingForOpponentPage
