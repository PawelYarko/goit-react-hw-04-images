import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

export default function Modal({ onClose, currentElemForModal }) {
    const modalRoot = document.querySelector('#modal-root');
  useEffect(() => {
    window.addEventListener('keydown', onModalEscPress);
    return () => {
      window.removeEventListener('keydown', onModalEscPress);  
    }
  }, []);

  const onModalEscPress = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };
  const onModalOverlayClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }   
  };

  return createPortal(
    <div className={s.overlay} onClick={onModalOverlayClick}>
      <div className={s.modal} onClick={e => e.stopPropagation()}>
        <img src={currentElemForModal.largeImageURL} alt={currentElemForModal.tag} />
      </div>
    </div>,
    modalRoot
  );
}
