import { Route, Routes } from "react-router-dom";
import Main from "./main/Main";

const MainRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Main />}/>
        </Routes>
    );
}
export default MainRouter;