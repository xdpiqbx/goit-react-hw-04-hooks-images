import { useEffect, useState } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button';
import Loader from 'react-loader-spinner';
import image from '../../images/cat.jpg';
import s from './ImageGallery.module.scss';
import mainFetch from '../../api/fetch';

const ImageGallery = props => {

  const [images, setImages] = useState([])
  const [currentQuery, setCurrentQuery] = useState('')
  const [status, setStatus] = useState('idle')
  const [page, setPage] = useState(1)

  useEffect(() => {
    if (!props.query){
      return
    }

    setStatus('pending')

    mainFetch(props.query, page)
      .then(data => {
          if(currentQuery === props.query){
            setImages(prev => [...prev, ...data.hits])
          }else{
            setImages(data.hits)
          }
          setStatus('resolved')
          setCurrentQuery(props.query)
        })
      .catch(error => setStatus('rejected'));
  }, [page, props.query])

  const onPageChange = () => {
    setPage(prev => prev + 1);
  };

  const imageClickHandler = event => {
    const { dataset, alt } = event.target;
    props.getContentForModal(dataset.big, alt);
  };

  if (images.length === 0 && status === 'resolved') {
    return (
      <>
        <h1>По Вашему запросу ничего не найдено</h1>
        <p>Не огорчайтесь. Вот Вам котик =)</p>
        <img src={image} alt="cat" width="500" />
      </>
    );
  }
  if (status === 'resolved' || status === 'pending') {
    return (
      <>
        <ul className={s.ImageGallery}>
          {images.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              smallImg={webformatURL}
              bigImg={largeImageURL}
              tags={tags}
              onClick={imageClickHandler}
            />
          ))}
        </ul>
        {status === 'pending' ? (
          <Loader
            type="RevolvingDot"
            color="#00BFFF"
            height={100}
            width={100}
          />
        ) : (
          <Button onPageChange={onPageChange} />
        )}
        {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          })
        }
      </>
    );
  }
  if (status === 'idle') {
    return <h1>Давай искать картинки =)</h1>;
  }
  if (status === 'rejected') {
    return <h1>Oh no =(</h1>;
  }
}
export default ImageGallery;