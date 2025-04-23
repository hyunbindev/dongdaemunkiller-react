import { Route, Routes } from "react-router-dom";
import Main from "./main/Main";
import BlamePage from "./blame/BlamePage";
import BlameDetailPage from "./blame/BlameDetailPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loginUser, UserState } from "../store/slice/userSlice";
import api from "../shared/api";
import PicturePage from "./pictures/PicturePage";

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
            <Route path="/blame" element={<BlamePage/>}/>
            <Route path="/blame/:blameId" element={<BlameDetailPage/>}/>
            <Route path="/pictures" element={<PicturePage/>}/>
        </Routes>
        </>
    );
}
export default MainRouter;