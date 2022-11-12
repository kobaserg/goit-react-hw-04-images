import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Loader } from '../Loader/Loader';
import Notiflix from 'notiflix';
import { Gallery } from './ImageGallery.styled';
import { Button } from '../Button/Button';

const URL = 'https://pixabay.com/api/?';
const API_KEY = '29969800-031613b21cddc77cf547ed849';

export function ImageGallery(props) {
  const [galleryImages, setGalleryImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(0);
  const [page, setPage] = useState(1);
  const [btnLoadMore, setBtnLoadMore] = useState(false);

  const { galleryName, urlLargeImage } = props;

  useEffect(() => {
    if (page === 1) setGalleryImage([]);
    if (galleryName !== '') {
      setLoading(true);
      fetch(
        `${URL}key=${API_KEY}&q=${galleryName}
        &image_type=photo&orientation=horizontal
        &per_page=${12}
        &page=${page}`
      )
        .then(responce => responce.json())
        .then(gallery => {
          if (gallery.totalHits === 0) {
            Notiflix.Notify.failure('Gallery not found');
            setBtnLoadMore(false);
            setGalleryImage([]);
          } else {
            setBtnLoadMore(true);
          }

          setGalleryImage(prev => prev.concat(gallery.hits));

          setTotalHits(gallery.totalHits);
        })
        .catch(error => console.log('ERROR---ERROR'))
        .finally(() => {
          setLoading(false);
        });
    } else setGalleryImage([]);
  }, [page, galleryName]);

  // if (galleryImages.length === totalHits && page > 1) {
  //   setBtnLoadMore(false);
  // }

  const handlModal = urlLargImage => {
    urlLargeImage(urlLargImage);
  };

  const onClickLoadMore = () => {
    setPage(page => page + 1);
  };

  return (
    <div>
      <Gallery>
        {galleryImages &&
          galleryImages.map(image => {
            return (
              <div key={image.id}>
                <ImageGalleryItem
                  imageReview={image.webformatURL}
                  largeImage={image.largeImageURL}
                  altImage={image.tags}
                  onModal={handlModal}
                />
              </div>
            );
          })}
      </Gallery>
      {btnLoadMore && <Button onBtnLM={onClickLoadMore} />}
      {loading && <Loader />}
    </div>
  );
}

ImageGallery.propTypes = {
  props: PropTypes.object,
};
