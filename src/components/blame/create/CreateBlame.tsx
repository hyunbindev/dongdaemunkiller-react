import { useState } from 'react';
import style from './createBlame.module.css';
import { BlameRequest } from '../../../data/BlameInterface';
import api from '../../../shared/api';
import { useSelector } from 'react-redux';
import EditBlame from './EditBlame';
import SelectMember from './SelectMember';
import { MemberSimple } from '../../../data/MemberInterface';
import { useNavigate } from 'react-router-dom';

interface CreateBlameProps{
    closeFunc:()=>void;
    refreshBlame:()=>void;
}

const CreateBlame:React.FC<CreateBlameProps> = ({closeFunc , refreshBlame}) => {
    const navigate = useNavigate();
    const user = useSelector((state: any) => state.user);
    const [selectedMember, setSelectedMember] = useState<MemberSimple[]>([]);
    const [blame, setBlame] = useState<BlameRequest>(
        {
            authorUuid: 'uuid',
            title: 'title',
            targetUuids: [],
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
                return <SelectMember setPhase={setPhase}
                        blameRequest={blame}
                        submitHandler={submitHandler}
                        selectedMember={selectedMember}
                        setSelectedMember={setSelectedMember}/>
            default:
                return;
        }
    }

    const submitHandler = () => {
        api.post('/api/v1/blame', {"authorUuid": user.uuid, "title": blame.title, "targetUuids": selectedMember.map((m) => m.uuid), "content": blame.content})
        .then((res: any) => {
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