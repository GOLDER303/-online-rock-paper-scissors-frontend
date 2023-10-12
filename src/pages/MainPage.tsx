const MainPage = () => {
    return (
        <div className="flex flex-col flex-grow h-screen pt-10 bg-gradient-to-r from-purple-700 to-purple-600 text-neutral-100">
            <h1 className=" text-4xl text-center font-bold drop-shadow-lg">Rock Paper Scissors</h1>
            <div className="flex justify-center items-center flex-grow">
                <button className="relative block mx-auto mb-8 py-6 px-16 text-xl text-white font-bold uppercase bg-gradient-to-r from-orange-400 to-orange-500 rounded-full">
                    <span className="absolute inset-1 border-white border-2 rounded-full"></span>
                    Play The Game
                </button>
            </div>
        </div>
    )
}

export default MainPage
