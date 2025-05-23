import { useState } from 'react';
import style from './createBlame.module.css';
import { BlameRequest } from '../../../data/BlameInterface';
import api from '../../../shared/api';
import { useSelector } from 'react-redux';
import EditBlame from './EditBlame';
import SelectMember from './SelectMember';

interface CreateBlameProps{
    closeFunc:()=>void;
    refreshBlame:()=>void;
}

const CreateBlame:React.FC<CreateBlameProps> = ({closeFunc , refreshBlame}) => {
    const user = useSelector((state: any) => state.user);

    const [blame, setBlame] = useState<BlameRequest>(
        {
            authorUuid: 'uuid',
            title: 'title',
            targetUuid: undefined,
            content: ''
        }
    );

    const [phase , setPhase] = useState<number>(0);

    const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBlame({...blame, content: e.target.value})
    };

    const phaseRenderHandler = (phase:number)=>{
        switch (phase) {
            case 0:
                return <EditBlame user={user} onChangeHandler={onChangeHandler} setPhase={setPhase} blameRequest={blame}/>
            case 1:
                return <SelectMember setPhase={setPhase} blameRequest={blame} submitHandler={submitHandler}/>
            default:
                return;
        }
    }

    const submitHandler = (targetUuid?: string) => {
        if (blame.content.trim().length < 1) {
            alert('저격글을 작성해주세요.');
            return;
        }

        const payload = targetUuid && targetUuid.trim().length > 0
            ? { ...blame, targetUuid: targetUuid }
            : blame;
    
        api.post('/api/v1/blame', payload)
            .then((res: any) => {
                console.log(res.data);
                refreshBlame();
                closeFunc();
            })
            .catch((err: any) => {
                console.error(err);
            });
    };


    return (
        <div id={style.createBlame}>
            {phaseRenderHandler(phase)}
        </div>
    );
}
export default CreateBlame;