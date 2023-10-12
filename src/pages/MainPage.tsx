const MainPage = () => {
    return (
        <div className="pt-10 h-screen bg-gradient-to-r from-purple-700 to-purple-500 text-neutral-100">
            <h1 className=" text-3xl text-center font-bold drop-shadow-lg">Rock Paper Scissors</h1>
            <div className="flex h-5/6 justify-center items-center text-xl">
                <button className="p-4 font-bold border-4 border-yellow-500 rounded-full shadow-xl">
                    Play The Game
                </button>
            </div>
        </div>
    )
}

export default MainPage
