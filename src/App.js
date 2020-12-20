import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Container from './components/Container/Container';
import Modal from './components/Modal';
import { useState } from 'react';

const App = () => {
  const [query, setQuery] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [bigImage, setBigImage] = useState(null)
  const [alt, setAlt] = useState(null)

  const onSubmitHandler = newQuery => {
    setQuery(newQuery)
  };

  const getContentForModal = (newBigImage, newAlt) => {
    setBigImage(newBigImage)
    setAlt(newAlt)
    setShowModal(true)
  };

  const toggleModal = () => {
    setShowModal(prev => !prev)
  };

  return (
    <Container>
      <Searchbar onSubmitHandler={onSubmitHandler} />
      <ImageGallery
        query={query}
        getContentForModal={getContentForModal}
      />
      {showModal && (
        <Modal src={bigImage} alt={alt} onClose={toggleModal} />
      )}
    </Container>
  );

}

export default App;