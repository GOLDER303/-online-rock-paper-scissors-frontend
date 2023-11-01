import React from "react"
import ReactDOM from "react-dom/client"
import { ErrorBoundary } from "react-error-boundary"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import ErrorPage from "./pages/ErrorPage.tsx"
import GamePage from "./pages/GamePage/GamePage.tsx"
import MainPage from "./pages/MainPage.tsx"
import "./style/index.css"

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />,
    },
    {
        path: "/rooms/:roomId",
        element: <GamePage />,
    },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ErrorBoundary FallbackComponent={ErrorPage}>
            <RouterProvider router={router} />
        </ErrorBoundary>
    </React.StrictMode>
)
