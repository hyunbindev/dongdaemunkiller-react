import { Route, Routes } from "react-router-dom";
import Main from "../pages/main/Main";
import BlamePage from "../pages/blame/BlamePage";
import BlameDetailPage from "../pages/blame/BlameDetailPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loginUser, UserState } from "../store/slice/userSlice";
import api from "../shared/api";
import JudgmentPage from "../pages/judgment/JudgmentPage";
import CreateJudgment from "../components/judgment/create/CreateJudgment";
import JudgmentDetailPage from "../pages/judgment/JudgmentDetailPage";

import Footer from "../components/common/footer/Footer";
import PersonaPage from "../pages/persona/PersonaPage";
import CreatePersona from "../components/persona/create/CreatePersona";
import PersonaDetailPage from "../pages/persona/detail/PersonaDetailPage";
import NewsPage from "../pages/news/NewsPage";
import NewsDetailPage from "../pages/news/NewsDetailPage";
import KeepAlive, { AliveScope } from "react-activation";
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
        <div style={{marginBottom:"5rem"}}>
        <AliveScope>
            <Routes>
                <Route path="/" element={<Main />}/>
                <Route path="/judgment" element={<JudgmentPage />}/>
                <Route path="/judgment/:judgmentId" element={<JudgmentDetailPage/>}/>
                <Route path="/judgment/create" element={<CreateJudgment/>}/>
                
                <Route path="/blame" element={<KeepAlive><BlamePage/></KeepAlive>}/>
                <Route path="/blame/:blameId" element={<BlameDetailPage/>}/>

                <Route path="/persona" element={<PersonaPage/>}/>
                <Route path="/persona/:personaId" element={<PersonaDetailPage/>}/>
                <Route path="/persona/create" element={<CreatePersona/>}/>

                <Route path="/news" element={<KeepAlive><NewsPage/></KeepAlive>}/>
                <Route path="/news/:newsId" element={<NewsDetailPage/>}/>
            </Routes>
        </AliveScope>
        <Footer/>
        </div>
    );
}
export default MainRouter;
