import { Link } from 'react-router-dom';
import style from './blamePage.module.css';
import Blame from '../../components/blame/Blame';
import Modal from '../../components/modal/Modal';
import CreateBlame from '../../components/blame/CreateBlame';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import useBlame from '../../hooks/useBlame';

const BlamePage = () => {
    const { blameList ,initBlamelist ,getNextPage} = useBlame();
    const [creatOpen, setCreateOpen] = useState<boolean>(false);
    const [ref, inView] = useInView();

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
    }, [inView]);

    return (
        <div id={style.blamePage}>
            <div id={style.newPost}>
                <button onClick={()=>modalOpenHandler()}>새 저격글 작성하기</button>
            </div>
            <div id={style.content}>
                {
                    blameList.map((blame, index) => {
                        return (
                            <Link key={blame.id} to={`/blame/${blame.id}`}>
                                <Blame key={blame.id} blame={blame}/>
                            </Link>
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
            <div ref={ref} style={{height:"10px"}}></div>
        </div>
    );
}

export default BlamePage;