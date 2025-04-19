import React, { useEffect } from "react";
import BlameSummary from "../../components/blame/BlameSummary";
import SherrifSummary from "../../components/sheriff/SheriffSummary";
import TrialSummary from "../../components/trial/TrailSummary";
import UserDetail from "../../components/userDetail/UserDetail";
import { useDispatch, useSelector } from "react-redux";
import api from "../../shared/api";
import { loginUser, UserState } from "../../store/slice/userSlice";

const Main = () => {
    return (
    <div>
        <UserDetail/>
        <SherrifSummary/>
        <TrialSummary/>
        <BlameSummary/>
    </div>
    );
}
export default Main;