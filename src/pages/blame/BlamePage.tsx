import { Link, ScrollRestoration, useNavigate } from 'react-router-dom';
import style from '../commonPage.module.css'
import Blame from '../../components/blame/Blame';
import Modal from '../../components/modal/Modal';
import CreateBlame from '../../components/blame/create/CreateBlame';
import { use, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import useBlame from '../../hooks/useBlame';
import KeepAlive, { useActivate, useUnactivate } from 'react-activation';
import useRestoreScroll from '../../hooks/useRestoreScroll';

const BlamePage = () => {
    const navigate = useNavigate();
    const { blameList ,initBlamelist ,getNextPage ,nextPage} = useBlame(navigate);
    const [creatOpen, setCreateOpen] = useState<boolean>(false);
    const [ref, inView] = useInView();

    const {saveScrollPoint} =useRestoreScroll();
    
    const modalOpenHandler = () => {
        setCreateOpen(true);
    }

    const modalCloseHandler = () => {
        setCreateOpen(false);
    }

    useEffect(() => {
        if (inView) {
            getNextPage();
        }
    }, [,inView]);

    return (
        <>
        <div id={style.page}>
            <div id={style.newPost}>
                <button onClick={()=>modalOpenHandler()}>새 저격글 작성하기</button>
            </div>
            
            <div id={style.content}>
                <div id={style.info}>
                    <h2>동대문 저격</h2>
                    <p>저격글을 작성하거나 저격글에 덧글을 다실 수 있습니다.<br/> 저격당한 대상은 게시글을 확인 할 수 없습니다.</p>
                </div>
                {
                    blameList.map((blame, index) => {
                        return blame.targeted ?(<Blame key={blame.id} blame={blame}/>):(
                            <div onClick={saveScrollPoint}>
                                <Link key={blame.id} to={`/blame/${blame.id}`}>
                                    <Blame key={blame.id} blame={blame}/>
                                </Link>
                            </div>
                        );
                    })
                }
            </div>
            {
                creatOpen && (
                    <Modal closeFunc={modalCloseHandler}>
                        <CreateBlame closeFunc={modalCloseHandler} refreshBlame={initBlamelist}/>
                    </Modal>
                )
            }
            <div ref={ref} style={{height:"20px"}}></div>
        </div>
        </>
    );
}

export default BlamePage;