import style from './TextContainer.module.css'

import { useRef, useState } from "react";

const TextContainer = () => {
    const [text,setText] = useState<string>("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const textareaHandler = () => {
    const areaRef = textareaRef.current;
        if (areaRef) {
            areaRef.style.height = 'auto';
            areaRef.style.height = `${areaRef.scrollHeight}px`;
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth', // 부드러운 스크롤 효과
            });
        }
    }
    return (
        <textarea
            ref={textareaRef}
            rows={1}
            onInput={textareaHandler}
            value={text}
            className={style.textContainer}
            placeholder="기사를 입력해 주세요."
            onChange={e=>{setText(e.target.value)}}>
        </textarea>
    );
}
export default TextContainer;