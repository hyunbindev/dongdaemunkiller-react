import { useEffect, useRef } from "react";
import style from './selectionBar.module.css'

interface SelectionBarProps{
    title:string;
    voteCount:number;
    totalVoteCount:number;
}

const SelectionBar:React.FC<SelectionBarProps> =({title,voteCount,totalVoteCount})=>{
    const canvasRef = useRef<HTMLCanvasElement|null>(null);
    useEffect(()=>{
        const canvas = canvasRef.current;
        if(!canvas) return;
        const ctx = canvas.getContext('2d');
        if(!ctx) return;
        const width = canvas.width;
        const height = canvas.height;
        
        const ratio =voteCount/totalVoteCount*100;
        ctx.fillStyle ='#ccc';
        ctx.fillRect(0, 0, width, height);
        if(totalVoteCount !== 0){
            draw(0);   
        }
        function draw(filled:number){
            const filledWidth = (width * ratio)/100;
            if (!ctx) return;
            ctx.fillStyle = '#09A573';
            ctx.fillRect(0,0,filled,height);
            
            if(filled < filledWidth){
                requestAnimationFrame(()=>draw(filled+10));   
            }
        };
    },[voteCount,totalVoteCount]);
    function ratio(count:number, total:number){
        if(total === 0) return 0;
        return count/total*100;
    }
    return(
        <div className={style.selectionBar}>
            <div className={style.info}>
                <div className={style.title}>{title}</div>
                <div className={style.ratio}>{`${Math.round(ratio(voteCount,totalVoteCount))}% (${voteCount}표)`}</div>
            </div>
            <canvas className={style.bar} ref={canvasRef} width={1000} height={20}/>
        </div>
    )
}
export default SelectionBar;