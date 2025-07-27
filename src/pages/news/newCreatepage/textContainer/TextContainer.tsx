import { NewsData } from '../../../../hooks/useCreateNews';
import style from './TextContainer.module.css'

import { useRef, useState } from "react";
interface TextContainerProps {
    setNewsData: React.Dispatch<React.SetStateAction<{title: string;image: null;text: string;}>>
    newsData : NewsData;
}

const TextContainer:React.FC<TextContainerProps> = ({newsData,setNewsData}) => {
    const [text,setText] = useState<string>("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);
        const textareaHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setNewsData(prev => ({ ...prev, text: value }));

        const areaRef = textareaRef.current;
        if (areaRef) {
            areaRef.style.height = 'auto';
            areaRef.style.height = `${areaRef.scrollHeight}px`;

            // 선택적: 자동 스크롤
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth',
            });
        }
    };
    return (
        <textarea
            ref={textareaRef}
            rows={1}
            onInput={textareaHandler}
            value={newsData.text}
            className={style.textContainer}
            placeholder="기사를 입력해 주세요."
            onChange={e=>{setText(e.target.value)}}>
        </textarea>
    );
}
export default TextContainer;