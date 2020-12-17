import { Component } from 'react';

import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Container from './components/Container/Container';
import Modal from './components/Modal';

class App extends Component {
  state = {
    query: '',
    showModal: false,
    bigImage: null,
    alt: null,
  };

  onSubmitHandler = query => {
    this.setState({
      query,
    });
  };

  getContentForModal = (bigImage, alt) => {
    this.setState({
      bigImage,
      alt,
      showModal: true,
    });
  };

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  };

  render() {
    const { query, showModal, bigImage, alt } = this.state;
    return (
      <Container>
        <Searchbar onSubmitHandler={this.onSubmitHandler} />
        <ImageGallery
          query={query}
          getContentForModal={this.getContentForModal}
        />
        {showModal && (
          <Modal src={bigImage} alt={alt} onClose={this.toggleModal} />
        )}
      </Container>
    );
  }
}

export default App;

//https://github.com/goitacademy/react-homework/tree/master/homework-03/image-finder
