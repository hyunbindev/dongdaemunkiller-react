import React, { useEffect } from "react";
import BlameSummary from "../../components/blame/BlameSummary";
import SherrifSummary from "../../components/sheriff/SheriffSummary";
import JudgmentSummary from "../../components/judgment/JudgmentSummary";
import UserDetail from "../../components/userDetail/UserDetail";

const Main = () => {
    return (
    <div>
        <UserDetail/>
        <SherrifSummary/>
        <JudgmentSummary/>
        <BlameSummary/>
    </div>
    );
}
export default Main;