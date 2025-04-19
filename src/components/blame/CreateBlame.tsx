import { useState } from 'react';
import style from './createBlame.module.css';
import { BlameRequest } from '../../data/BlameInterface';
import api from '../../shared/api';
const CreateBlame:React.FC<{ closeFunc:()=>void , refreshBlame:()=>void}> = ({closeFunc , refreshBlame}) => {
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
                    <img src='http://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg' id={style.profile}/>
                    <div id={style.authorName}>작성자</div>
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