import { Route, Routes } from "react-router-dom"
import Login from "../pages/login/Login"
import Auth from "../pages/auth/Auth"

const AuthRouter = () => {
    return(
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/auth" element={<Auth />} />
        </Routes>
    )
}
export default AuthRouter;