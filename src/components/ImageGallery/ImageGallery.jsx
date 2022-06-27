import { useState, useEffect, useReducer } from 'react';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Modal from 'components/Modal/Modal';
import Button from 'components/Button/Button';
import Loader from '../Loader/Loader';
import fetchRequest from '../../service/fetchRequest';
import useToggle from '../../hooks/useToggle/useToggle';
import s from './ImageGallery.module.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  REJECTED: 'rejected',
  RESOLVE: 'resolved',
};

export default function ImageGallery({ imageName }) {
  const [searchRequest, setSearchRequest] = useReducer(responseReducer , null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [largeImg, setLargeImg] = useState(null);
  const [alt, setAlt] = useState(null);
  const [page, setPage] = useState(1);

  const { isOpen, open, close } = useToggle();

  function responseReducer (prevResponse, nextResponse){
    if(prevResponse){
      return [...prevResponse, ...nextResponse];
    }else if(prevResponse === null){
      return nextResponse;
    }
  }

  useEffect(() => {
    if (!imageName) {
      return;
    }

    fetchRequest(imageName, page)
      .then(response => {
        setSearchRequest(response);
        setStatus(Status.RESOLVE);
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [imageName, page]);
 
  const openModal = e => {
    open();
    setLargeImg( e.target.dataset.img);
    setAlt(e.target.alt);
  };

  const onBtnLoadClick = () => setPage(page + 1);

  return (
    <div>
      {status === Status.IDLE && <div>Введите запрос в поле ввода</div>}
      {status === Status.PENDING && <Loader />}
      {status === Status.REJECTED && <h1>{error}</h1>}
      {status === Status.RESOLVE && (
        <div className={s.content}>
          <ul className={s.gallery} onClick={openModal}>
            <ImageGalleryItem searchRequest={searchRequest} />
            {isOpen && <Modal onClose={close} largeImg={largeImg} alt={alt} />}
          </ul>
          <Button onBtnLoadClick={onBtnLoadClick} />
        </div>
      )}
    </div>
  );
}
