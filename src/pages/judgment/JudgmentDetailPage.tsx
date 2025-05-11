import { useParams } from "react-router-dom";
import JudgmentPage from "./JudgmentPage";
import Judgment from "../../components/judgment/Judgment";
import useJudgmentDetail from "../../hooks/useJudgmentDetail";

const JudgmentDetailPage = ()=>{
    const {judgmentId} = useParams<{judgmentId:string}>();
    const {judgment}=useJudgmentDetail(judgmentId)
    return(
        <div>
            {judgment ? <Judgment judgment={judgment} preview={false}/>:"재판 가져오는중..."}
        </div>
    )
}
export default JudgmentDetailPage;