import s from './ImageGalleryItem.module.css'


const ImageGalleryItem = ({img , openModal}) =>{

    const onClick = () =>{
        openModal(img);
    }
    const {id, tags, webformatURL} = img;
            return (
                <li className={s.item} key={id} onClick={onClick}>
                <img className={s.image} src={webformatURL} alt={tags} data-id={id}/>
            </li>
            )
}

export default ImageGalleryItem;