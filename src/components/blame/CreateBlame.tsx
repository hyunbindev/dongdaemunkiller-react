import { useState } from 'react';
import style from './createBlame.module.css';
import { BlameRequest } from '../../data/BlameInterface';
import api from '../../shared/api';
import { useSelector } from 'react-redux';
const CreateBlame:React.FC<{ closeFunc:()=>void , refreshBlame:()=>void}> = ({closeFunc , refreshBlame}) => {
    const user = useSelector((state: any) => state.user);
    const [blame, setBlame] = useState<BlameRequest>(
        {
            authorUuid: 'uuid',
            title: 'title',
            targetUuid: undefined,
            content: ''
        }
    );

    const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBlame({...blame, content: e.target.value}
    )};

    const submitHandler = () => {
        if (blame.content.trim().length < 1) {
            alert('저격글을 작성해주세요.');
            return;
        }
        api.post('/api/v1/blame', blame)
            .then((res:any) => {
                console.log(res.data);
                refreshBlame();
                closeFunc();
            })
            .catch((err:any) => {
                console.error(err);
            });
        }

    return (
        <div id={style.createBlame}>
            <h1>새로운 저격글</h1>
            <div id={style.blameForm}>
                <div id={style.blameAuthor}>
                    <img src={user.profile} id={style.profile}/>
                    <div id={style.authorName}>{user.name}</div>
                </div>
                <div id={style.blameTextContainer}>
                    <textarea onChange={e=>onChangeHandler(e)} id={style.text}placeholder='저격글을 작성하세요.'></textarea>
                </div>
            </div>
            <div id={style.footer}>
                <button id={style.submit} onClick={submitHandler}>게시</button>
            </div>
        </div>
    );
}
export default CreateBlame;