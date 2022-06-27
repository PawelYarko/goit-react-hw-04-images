import {useEffect} from 'react'
import s from './Modal.module.css'


export default function Modal({ onClose, largeImg, alt }){

    useEffect (() =>{
        window.addEventListener('keydown', onModalEscPress);
        window.addEventListener('click', onModalOverlayClick);
        return () =>{
            window.removeEventListener('keydown', onModalEscPress);
            window.removeEventListener('click', onModalOverlayClick);
            }
    },[])

    const onModalEscPress = e => {
        if(e.code === 'Escape' ){
            onClose();
    }}
    const onModalOverlayClick = e =>{
        if(e.currentTarget === e.target){
            onClose();
        }
    }

        return (
        <div className={s.overlay} onClick={onModalEscPress || onModalOverlayClick}>
            <div className={s.modal} onClick={e => e.stopPropagation()}>
                <img src={largeImg} alt={alt} />
            </div>
        </div>
    )
}