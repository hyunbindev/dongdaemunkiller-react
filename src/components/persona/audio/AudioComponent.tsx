import { useEffect, useRef, useState } from "react";
import style from './audioComponent.module.css';
import play_icon from '../../../assets/dark/play_dark.svg';
import pause_icon from '../../../assets/dark/pause_dark.svg';
interface AudioComponentProps {
    objectURL: string;
}
const AudioComponent:React.FC<AudioComponentProps> = ({objectURL}) => {
    const audioRef = useRef<HTMLAudioElement|null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const playAudio = () => {
    const audio = audioRef.current;
        if (audio) {
            if (audio.paused) {
                audio.play();
                setIsPlaying(true);
            } else {
                audio.pause();
                setIsPlaying(false);
            }
        }
    }
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);

    // useEffect 안에서 이벤트 리스너 추가
    useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
        setCurrentTime(audio.currentTime);
        setDuration(audio.duration); // optional
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateTime);
    audio.addEventListener("ended", () => {
        setIsPlaying(false);
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
        } 
    });
    console.log(objectURL);
    return () => {
        audio.removeEventListener("timeupdate", updateTime);
        audio.removeEventListener("loadedmetadata", updateTime);
    };
    }, []);

    useEffect(() => {
        let animationFrame: number;

        const draw = () => {
        const audio = audioRef.current;
        const canvas = canvasRef.current;
        if (!audio || !canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const progress = audio.currentTime / audio.duration;
        const width = canvas.width;
        const height = canvas.height;

        // clear
        ctx.clearRect(0, 0, width, height);

        // 배경
        ctx.fillStyle = '#453f4b';
        ctx.fillRect(0, 0, width, height);

        // 진행 바
        ctx.fillStyle = '#A769E2';
        ctx.fillRect(0, 0, width * progress, height);

        animationFrame = requestAnimationFrame(draw);
        };

        draw();

        return () => cancelAnimationFrame(animationFrame);
    }, [audioRef]);
    const formatTimeSafely = (time: number | undefined | null): string => {
        if (typeof time !== 'number' || !isFinite(time) || isNaN(time)) {
            return '--:--';
        }

        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };
    return (
        <>
        <audio ref={audioRef} style={{display: 'none'}} controls>
            <source src={objectURL}/>
        </audio>
        <div className={style.audioContainer}>
            <img onClick={(e)=>{playAudio(); e.stopPropagation();}} className={style.controlBtn} src={isPlaying ? pause_icon:play_icon}/>
            <div className={style.canvasContainer}>
                <canvas ref={canvasRef} className={style.progress} width="300" height="30" style={{borderRadius:"0.5rem"}}/>
                <div className={style.currentTime}>{formatTimeSafely(currentTime)}</div>
                <div className={style.endTime}>{formatTimeSafely(duration)}</div>
            </div>
        </div>
        </>
    );
}
export default AudioComponent;