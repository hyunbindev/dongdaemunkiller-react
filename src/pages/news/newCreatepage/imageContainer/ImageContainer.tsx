import style from './ImageContainer.module.css'

import addPhoto_icon from '../../../../assets/add_photo.svg'
import close_icon from '../../../../assets/close.svg'
import { useEffect, useState } from 'react';



interface ImageContainerProps {
    imageFile: File|null; // 이미지 URL을 받아옵니다.
    openFileDialog:()=>void;
    handleRemoveImage:()=>void;
}

const ImageContainer:React.FC<ImageContainerProps> = ({imageFile,openFileDialog,handleRemoveImage}) => {
    // 이 컴포넌트는 이미지 업로드 및 미리보기 기능을 담당합니다.
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    useEffect(()=>{
        console.log("imageFile", imageFile);
        if(imageFile){
            const url = URL.createObjectURL(imageFile);
            setImageUrl(url);
            return ()=>{
                URL.revokeObjectURL(url);
            }
        }
    }, [imageFile]);

    return imageFile ?  (
        <div className={style.imageContainer_withImage}>
            {imageUrl && <img src={imageUrl} alt="upload img" className={style.image} />}
            <div id={style.deleteIcon} onClick={handleRemoveImage}>
                <img src={close_icon}/>
            </div>
        </div>
    ) : (
        <div className={style.imageContainer_withoutImage} onClick={() => openFileDialog()}>
            <img src={addPhoto_icon} alt="upload img icon" className={style.image} />
            <div>이미지를 추가해 보세요!</div>
        </div>
    );
}
export default ImageContainer;