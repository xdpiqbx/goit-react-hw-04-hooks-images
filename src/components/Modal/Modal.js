import { Component } from 'react';
import { createPortal } from 'react-dom';
import Loader from 'react-loader-spinner';
import s from './Modal.module.scss';

const modal = document.querySelector('#modal');

class Modal extends Component {
  state = {
    imageStatus: 'loading',
  };

  componentDidMount() {
    window.addEventListener('keydown', this.toggleModal);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.toggleModal);
  }

  toggleModal = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  };

  handleImageLoaded() {
    this.setState({ imageStatus: 'loaded' });
  }

  render() {
    const { src, alt } = this.props;
    return createPortal(
      <div className={s.Overlay} onClick={this.handleBackdropClick}>
        <div className={s.Modal}>
          <img src={src} alt={alt} onLoad={this.handleImageLoaded.bind(this)} />
          {this.state.imageStatus === 'loading' ? (
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
}

export default Modal;
