import { Route, Routes } from "react-router-dom"
import Login from "./login/Login"
import Auth from "./auth/Auth"

const AuthRouter = () => {
    return(
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/auth" element={<Auth />} />
        </Routes>
    )
}
export default AuthRouter;