import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';


export default function ImageGallery({ searchRequest, openModal }) {
  return (
    <div className={s.content}>
      <ul className={s.gallery}>
        {searchRequest.map(img => {
          return (
            <ImageGalleryItem key={img.id} img={img} openModal={openModal} />
          );
        })}
      </ul>
    </div>
  );
}
