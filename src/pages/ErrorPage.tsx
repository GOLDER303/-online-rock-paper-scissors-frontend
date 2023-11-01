import { FallbackProps } from "react-error-boundary"

const ErrorPage: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
    return (
        <>
            <h1>{error}</h1>
            <button onClick={resetErrorBoundary}>Reset</button>
        </>
    )
}

export default ErrorPage
