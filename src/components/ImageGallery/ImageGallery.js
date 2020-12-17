import { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button';
import Loader from 'react-loader-spinner';
import image from '../../images/cat.jpg';
import s from './ImageGallery.module.scss';
import mainFetch from '../../api/fetch';
class ImageGallery extends Component {
  state = {
    images: null || [],
    error: null,
    status: 'idle',
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.query;
    const currentQuery = this.props.query;

    const page = this.state.page;

    if (prevQuery !== currentQuery) {
      this.setState({
        images: [],
      });
    }

    if (prevQuery !== currentQuery || prevState.page !== this.state.page) {
      // проверка чтоб не зациклило

      this.setState({ status: 'pending' });

      mainFetch(currentQuery, page)
        .then(data =>
          this.setState(prevState => ({
            images: [...prevState.images, ...data.hits],
            status: 'resolved',
          })),
        )
        .catch(error => this.setState({ error, status: 'rejected' }));
    }

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  onPageChange = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  imageClickHandler = event => {
    const { dataset, alt } = event.target;
    this.props.getContentForModal(dataset.big, alt);
  };

  render() {
    const { images, status } = this.state;

    if (images.length === 0 && status === 'resolved') {
      return (
        <>
          <h1>По Вашему запросу ничего не найдено</h1>
          <p>Не огочайтесь. Вот Вам котик =)</p>
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
                onClick={this.imageClickHandler}
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
            <Button onPageChange={this.onPageChange} />
          )}
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
}
export default ImageGallery;
