import { Route, Routes } from "react-router-dom";
import Main from "./main/Main";
import BlamePage from "./blame/BlamePage";
import BlameDetailPage from "./blame/BlameDetailPage";

const MainRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Main />}/>
            <Route path="/blame" element={<BlamePage/>}/>
            <Route path="/blame/:blameId" element={<BlameDetailPage/>}/>
        </Routes>
    );
}
export default MainRouter;