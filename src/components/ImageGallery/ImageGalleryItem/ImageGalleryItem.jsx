import s from './ImageGalleryItem.module.css'


const ImageGalleryItem = ({searchRequest}) =>{
    return (
        searchRequest.map(({id, tags, webformatURL})=> {
            return (
                <li className={s.item} key={id}>
                <img className={s.image} src={webformatURL} alt={tags} data-id={id}/>
            </li>
            )
            })
    )
}

export default ImageGalleryItem;