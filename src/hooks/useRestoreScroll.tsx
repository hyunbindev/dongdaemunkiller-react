import { useState } from "react";
import { useActivate } from "react-activation";

const useRestoreScroll = ()=>{
    const [savePoint, setSavePoint] = useState<number>(0);
    
    const saveScrollPoint = ()=>{
        setSavePoint(window.scrollY);
    }
    
    useActivate(()=>{
        window.scrollTo({
                top: savePoint,
                behavior: 'instant'
            });
    })
    return {saveScrollPoint}
}
export default useRestoreScroll;