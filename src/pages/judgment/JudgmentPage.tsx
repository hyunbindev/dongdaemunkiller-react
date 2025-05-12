import { Link } from 'react-router-dom';
import Judgment from '../../components/judgment/Judgment';
import useJudgment from '../../hooks/useJudgment';
import style from '../commonPage.module.css';
import { useEffect, useState } from 'react';
import Modal from '../../components/modal/Modal';
import CreateJudgment from '../../components/judgment/create/CreateJudgment';
import { useInView } from 'react-intersection-observer';
const JudgmentPage = () => {
  const {judgmentList, initJudgmentlist ,getNextPage} = useJudgment();
  const [ref, inView] = useInView();
  useEffect(()=>{
    if(inView){
      getNextPage();
    }
  },[])
  useEffect(() => {
      if (inView) {
          getNextPage();
      }
  }, [inView]);
  return (
    <div id={style.page}>
      <div id={style.newPost}>
        <Link to={'/judgment/create'}>
          <button>새 재판 시작하기</button>
        </Link>
      </div>
      <div id={style.content}>
        <div id={style.info}>
          <h2>동대문 재판</h2>
          <p>
            동대문 재판에 대한 투표와 덧글을 작성하실 수있습니다.
            <br />
            투표를 통한 공정한 재판 결과를 기대합니다.
          </p>
        </div>
        {
          /**재판글 리스트 */
          judgmentList.map((judgment,index)=>{
            return <Link key={judgment.id} to={`/judgment/${judgment.id}`}>
                      <Judgment key={judgment.id} judgment={judgment} preview={true}/>
                    </Link>})
        }
      </div>
      <div ref={ref} style={{height:"10px"}}></div>
    </div>
  );
}
export default JudgmentPage;