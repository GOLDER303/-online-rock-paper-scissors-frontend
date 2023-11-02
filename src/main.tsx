import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import ErrorPage from "./pages/ErrorPage.tsx"
import GamePage from "./pages/GamePage/GamePage.tsx"
import MainPage from "./pages/MainPage.tsx"
import "./style/index.css"

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/rooms/:roomId",
        element: <GamePage />,
        errorElement: <ErrorPage />,
    },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
