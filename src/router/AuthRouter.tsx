import { Route, Routes } from "react-router-dom"
import Login from "../pages/login/Login"
import Auth from "../pages/auth/Auth"
import RedirectionAuth from "../pages/auth/RedirectionAuth"

const AuthRouter = () => {
    return(
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<RedirectionAuth/>} />
        </Routes>
    )
}
export default AuthRouter;