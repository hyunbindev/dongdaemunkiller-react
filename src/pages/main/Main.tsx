import React, { useEffect } from "react";
import BlameSummary from "../../components/blame/BlameSummary";
import SherrifSummary from "../../components/sheriff/SheriffSummary";
import TrialSummary from "../../components/trial/TrailSummary";
import UserDetail from "../../components/userDetail/UserDetail";

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