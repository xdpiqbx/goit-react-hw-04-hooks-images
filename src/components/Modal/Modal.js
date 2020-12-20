import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Loader from 'react-loader-spinner';
import s from './Modal.module.scss';

const modal = document.querySelector('#modal');

const  Modal = props => {
  const [imageStatus, setImageStatus] = useState('loading')

  useEffect( () => {
    window.addEventListener('keydown', toggleModal);
    return ()=>{
      window.removeEventListener('keydown', toggleModal);
    }
  })

  const toggleModal = event => {
    if (event.code === 'Escape') {
      props.onClose();
    }
  };

  const handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      props.onClose();
    }
  };

  const handleImageLoaded = () => {
    setImageStatus('loaded')
  }

  const { src, alt } = props;
  return createPortal(
    <div className={s.Overlay} onClick={handleBackdropClick}>
      <div className={s.Modal}>
        <img src={src} alt={alt} onLoad={handleImageLoaded} />
        {imageStatus === 'loading' ? (
          <Loader
            type="RevolvingDot"
            color="#00BFFF"
            height={100}
            width={100}
          />
        ) : null}
      </div>
    </div>,
    modal,
  );
}

export default Modal