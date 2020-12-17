import s from './ImageGalleryItem.module.scss';
export default function ImageGalleryItem(props) {
  const { smallImg, bigImg, tags } = props;
  return (
    <li className={s.ImageGalleryItem}>
      <img
        src={smallImg}
        alt={tags}
        data-big={bigImg}
        className={s.ImageGalleryItemImage}
        onClick={props.onClick}
      />
    </li>
  );
}
