import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';

export function App() {
  const [searchGallery, setSearchGallery] = useState('');
  const [onModal, setOnModal] = useState(false);
  const [urlLargeImage, setUrlLargeImage] = useState('');

  useEffect(() => {
    window.addEventListener('keydown', event => {
      if (event.code === 'Escape') setOnModal(false);
    });
  }, [onModal]);

  const handleFormSubmit = searchGallery => {
    setSearchGallery(searchGallery);
  };

  const handleModal = urlLargeImg => {
    setOnModal(true);
    setUrlLargeImage(urlLargeImg);
  };

  const isCloseModal = () => {
    setOnModal(false);
    window.removeEventListener('keydown', event => {
      if (event.code === 'Escape') setOnModal(false);
    });
  };

  return (
    <div>
      <Searchbar onSearchGallery={handleFormSubmit} />
      <ImageGallery galleryName={searchGallery} urlLargeImage={handleModal} />
      {onModal && <Modal urlModal={urlLargeImage} closeModal={isCloseModal} />}
    </div>
  );
}
