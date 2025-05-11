import { Route, Routes } from "react-router-dom";
import Main from "../pages/main/Main";
import BlamePage from "../pages/blame/BlamePage";
import BlameDetailPage from "../pages/blame/BlameDetailPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loginUser, UserState } from "../store/slice/userSlice";
import api from "../shared/api";
import PicturePage from "../pages/pictures/PicturePage";
import JudgmentPage from "../pages/judgment/JudgmentPage";
import CreateJudgment from "../components/judgment/create/CreateJudgment";
import JudgmentDetailPage from "../pages/judgment/JudgmentDetailPage";

const MainRouter = () => {
    const user = useSelector((state: any) => state.user);
    const dispatch = useDispatch();
    useEffect(() => {
        if(user.uuid === null) {
            api.get<UserState>('/api/v1/member')
            .then((res) => {
                dispatch(loginUser(res.data));
            })
            .catch((err:any) => {
                console.error(err);
            });
        }
    },[user]);
    
    return (
        <>
        <Routes>
            <Route path="/" element={<Main />}/>
            <Route path="/judgment" element={<JudgmentPage />}/>
            <Route path="/judgment/:judgmentId" element={<JudgmentDetailPage/>}/>
            <Route path="/judgment/create" element={<CreateJudgment/>}/>
            <Route path="/blame" element={<BlamePage/>}/>
            <Route path="/blame/:blameId" element={<BlameDetailPage/>}/>
        </Routes>
        </>
    );
}
export default MainRouter;