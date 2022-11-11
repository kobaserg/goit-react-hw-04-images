import React from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Loader } from '../Loader/Loader';
import Notiflix from 'notiflix';

import { Gallery } from './ImageGallery.styled';

const URL = 'https://pixabay.com/api/?';
const API_KEY = '29969800-031613b21cddc77cf547ed849';

export class ImageGallery extends React.Component {
  state = {
    galleryImage: [],
    loading: false,
    error: null,
    totalHits: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.galleryName !== this.props.galleryName ||
      prevProps.page !== this.props.page
    ) {
      this.setState({
        loading: true,
      });

      if (this.props.onSubmitForm) {
        this.setState({ galleryImage: [] });
      }

      fetch(
        `${URL}key=${API_KEY}&q=${this.props.galleryName}
        &image_type=photo&orientation=horizontal
        &per_page=${this.props.per_page}
        &page=${this.props.page}`
      )
        .then(responce => responce.json())
        .then(gallery => {
          if (gallery.totalHits === 0) {
            Notiflix.Notify.failure('Gallery not found');
            this.props.onBtnLoadMore(false);
          } else this.props.onBtnLoadMore(true);

          this.setState(prevState => ({
            galleryImage: prevState.galleryImage.concat(gallery.hits),
            totalHits: gallery.totalHits,
            error: false,
          }));
          // console.log(this.state.galleryImage.length, this.state.totalHits);
          // if (this.state.galleryImage.length === this.state.totalHits) {
          //   this.props.onBtnLoadMore(false);
          // }
        })
        .catch(error => this.setState({ error: true }))
        .finally(() => {
          this.setState({ loading: false });
        });
    }
  }

  handlModal = urlLargImage => {
    this.props.urlLargeImage(urlLargImage);
  };

  render() {
    const images = this.state.galleryImage;

    return (
      <div>
        <Gallery>
          {images &&
            images.map(image => {
              return (
                <div key={image.id}>
                  <ImageGalleryItem
                    imageReview={image.webformatURL}
                    largeImage={image.largeImageURL}
                    altImage={image.tags}
                    onModal={this.handlModal}
                  />
                </div>
              );
            })}
        </Gallery>
        {this.state.loading && <Loader />}
      </div>
    );
  }
}

ImageGallery.propTypes = {
  props: PropTypes.object,
};
