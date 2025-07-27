import { useEffect, useRef, useState } from 'react';
import style from './NewsCreatePage.module.css'
import ImageContainer from './imageContainer/ImageContainer';
import TextContainer from './textContainer/TextContainer';
import { useCreateNews } from '../../../hooks/useCreateNews';
const NewsCreatePage = ()=>{
    const inputRef = useRef<HTMLInputElement>(null);

    const [imageFile, setImageFile] = useState<File  | null>(null);
    
    const [newsData , setNewsData] = useState({
        title: '',
        image: null,
        text: ''
    });

    const {submitNews} = useCreateNews();

    const openFileDialog = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setNewsData(prev => ({ ...prev, title: value }));
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            setImageFile(file);
        }
        
    };
    const handleRemoveImage = () => {
        setImageFile(null);
        if (inputRef.current) {
            inputRef.current.value = ''; // input 요소의 value 초기화
        }
    };
    
    return(
        <div id={style.createPage}>
            <div id={style.header}>
                <h1>DongDaemun Times</h1>
                <h2>“what’s happening now in Dongdaemun.”</h2>
            </div>
            <input id={style.title} value={newsData.title} onChange={handleTitleChange} placeholder='제목을 입력해 주세요'/>
            <input type="file" accept="image/jpeg, image/jpg, image/png" ref={inputRef} onChange={handleImageChange} style={{display:"none"}}/>

            <ImageContainer openFileDialog={openFileDialog} imageFile={imageFile} handleRemoveImage={handleRemoveImage}/>

            <TextContainer newsData={newsData} setNewsData={setNewsData}/>
            <div id={style.buttonContainer}>
                <button id={style.submit} onClick={()=>submitNews(newsData,imageFile)}>기사 쓰기</button>
            </div>
        </div>);
}
export default NewsCreatePage;