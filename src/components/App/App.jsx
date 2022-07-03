import { useState, useEffect } from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Modal from 'components/Modal/Modal';
import Loader from '../Loader/Loader';
import fetchRequest from '../../service/fetchRequest';
import useToggle from '../../hooks/useToggle/useToggle';
import s from './App.module.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  REJECTED: 'rejected',
  RESOLVE: 'resolved',
};

export default function App() {
  const [imageName, setImageName] = useState('');
  const [searchRequest, setSearchRequest] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [currentElemForModal, setCurrentElemForModal] = useState(() => null);
  const [page, setPage] = useState(1);

  const { isOpen, open, close } = useToggle();

  useEffect(() => {
    if (!imageName) {
      return;
    }
    fetchRequest(imageName, page)
      .then(hits => {
        setSearchRequest(response => [...response, ...hits]);
        setStatus(Status.RESOLVE);
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [imageName, page]);

  const openModal = img => {
    setCurrentElemForModal(img);
    open();
  };

  const onBtnLoadClick = () => setPage(page + 1);

  const handleFormSubmit = inputValue => {
    setImageName(inputValue);
    setSearchRequest([]);
  };

  return (
    <div className={s.container}>
      <Searchbar onSubmit={handleFormSubmit} />
      {status === Status.IDLE && <div>Введите запрос в поле ввода</div>}
      {status === Status.PENDING && <Loader />}
      {status === Status.REJECTED && <h1>{error}</h1>}
      {status === Status.RESOLVE && (
        <ImageGallery searchRequest={searchRequest} openModal={openModal} onBtnLoadClick={onBtnLoadClick} />
      )}
      {isOpen && (
        <Modal
          onClose={close}
          onOpen={open}
          currentElemForModal={currentElemForModal}
        />
      )}
    </div>
  );
}
