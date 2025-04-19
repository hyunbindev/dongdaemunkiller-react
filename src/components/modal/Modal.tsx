import React, { useEffect } from 'react';
import style from './modal.module.css';

const Modal: React.FC<{ children: React.ReactNode , closeFunc:()=>void}> = ({ children ,closeFunc}) => {
    //모달 열릴시 스크롤 정지
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <div className={style.modalBackground} onClick={closeFunc}>
            <div className={style.modalContainer} onClick={(e => e.stopPropagation())}>
                {children}
            </div>
        </div>
    );
};

export default Modal;