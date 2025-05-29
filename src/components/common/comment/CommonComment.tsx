import style from './commonComment.module.css';
import send_disabled from '../../../assets/send_disable.svg'
import send_abled from '../../../assets/send_able.svg'
import React, { useMemo, useRef, useState } from 'react';
import NoComment from './NoComment';

interface CommonCommentProps {
  onCommentSubmit: (comment: string) => void;
  commentNodes: React.ReactNode[];
}

const CommonComment:React.FC<CommonCommentProps> = ({onCommentSubmit,commentNodes}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState<string>("");
  const textareaHandler = () => {
    const areaRef = textareaRef.current;

    if (areaRef) {
      areaRef.style.height = 'auto';
      areaRef.style.height = `${areaRef.scrollHeight}px`;
    }
  }

  const commentBoarderHandler = () => {
    if(text.trim().length > 0) return style.abled;
    return style.disabled;
  }

  const commentImage = useMemo(() => {
    return text.trim().length > 0 ? send_abled : send_disabled;
  }, [text]);

  const submitComment = () => {
    if (text.trim().length > 0){
      onCommentSubmit(text);
      setText("");
      setTimeout(() => {
        const areaRef = textareaRef.current;
        if (areaRef) {
          areaRef.style.height = 'auto';
          areaRef.style.height = `${areaRef.scrollHeight}px`;
        }
      }, 0);
    } 
  }

  return (
    <div className={style.commonComment}>
      <div id={style.commentInputContainer} className={commentBoarderHandler()}>
        <textarea 
            placeholder='덧글 추가하기...'
            ref={textareaRef}
            rows={1}
            onInput={textareaHandler}
            value={text}
            onChange={e=>{setText(e.target.value)}}/>
            <div id={style.buttonContainer}>
              <img id={style.send} src={commentImage} onClick={submitComment}/>
            </div>
      </div>
      <div>
        {commentNodes?.map((node, index) => (
          <div key={index} className={style.commentNode}>
            {node}
          </div>
        ))}
      </div>
      {commentNodes.length === 0 && <NoComment />}
    </div>
  );
}
export default CommonComment;