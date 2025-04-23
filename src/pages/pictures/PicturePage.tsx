import React from 'react';
import style from './picturePage.module.css'
import Picture from '../../components/pictures/Picture';
const PicturePage = ()=>{
    return (
        <div id={style.picture_page}>
            <Picture/>
            <Picture/>
            <Picture/>
            <Picture/>
            <Picture/>
            <Picture/>
        </div>
    )
}
export default PicturePage;