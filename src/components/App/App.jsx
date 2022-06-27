import { useState } from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import s from './App.module.css';

export default function App() {
  const [imageName, setImageName] = useState('');

  const handleFormSubmit = (imageName) => setImageName(imageName);

  return (
    <div className={s.container}>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery imageName={imageName} />
    </div>
  );
}
