import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Button from 'components/Button/Button';
import s from './ImageGallery.module.css';


export default function ImageGallery({ searchRequest, openModal , onBtnLoadClick}) {
  return (
    <div className={s.content}>
      <ul className={s.gallery}>
        {searchRequest.map(img => {
          return (
            <ImageGalleryItem key={img.id} img={img} openModal={openModal} />
          );
        })}
      </ul>
      <Button onBtnLoadClick={onBtnLoadClick} />
    </div>
  );
}
