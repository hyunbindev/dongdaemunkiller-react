import { filter } from "lodash";
import { useState } from "react";
import api from '../shared/api';
const useCreatejudgment = () =>{
    const [selections, setSelections] = useState<string[]>(['',]);
    const [title, setTitle] = useState<string>('');
    const [text, setText] = useState<string>('');

    const selectionTitleHandler=(title:string,index:number)=>{
        setSelections(prev => {
            const updated = [...prev];
            updated[index] = title;

            return updated;
        });
    }
    
    const addSelection = ()=>{
        setSelections(prev => [...prev,'']);
    }

    const deleteSelection = (index:number)=>{
        if(selections.length <2){
            alert("최소 한개 선택지는 입력해 주세요.");
            return;
        }
        setSelections(prev => prev.filter((_, i) => i !== index));
    }
    
    const submitJudgment = ()=>{
        if(filterEmptyInput(title)){
            alert('제목을 입력해 주세요');
            return;
        }
        if(filterEmptyInput(text)){
            alert('본문을 입력해 주세요')
            return;
        }
        const filterdSelections = selections.filter((title)=> title.trim().length >0);
        if(filterdSelections.length<1){
            alert('최소 하나의 선택지는 입력해 주세요.')
            return;
        }
        const mappedSelections = filterdSelections.map((title)=>({ title }))
        api.post('/api/v1/judgment',
            {
                "title" : title,
                "text" : text,
                "selections" : mappedSelections,
            }
        ).then((res)=>console.log(res))
        .catch((err)=>console.error(err));
    }

    function filterEmptyInput(string:string){
        if(string.trim.length<1) return false;
        return true;
    }

    return {selections, 
            selectionTitleHandler,
            addSelection,
            deleteSelection,
            title,
            setTitle,
            text,
            setText,
            submitJudgment}
}
export default useCreatejudgment;