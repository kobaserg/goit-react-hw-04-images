import React from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';

export class App extends React.Component {
  state = {
    searchGallery: '',
    page: 1,
    per_page: 12,
    onModal: false,
    onVisibleBtnLoadMore: false,
    urlLargeImage: '',
    submitSearch: true,
  };

  componentDidMount() {
    window.addEventListener('keydown', event => {
      if (event.code === 'Escape') this.setState({ onModal: false });
    });
  }

  handleFormSubmit = searchGallery => {
    this.setState({
      searchGallery,
      onVisibleBtnLoadMore: false,
      page: 1,
      submitSearch: true,
    });
  };

  handleModal = urlLargeImg => {
    this.setState({
      onModal: true,
      urlLargeImage: urlLargeImg,
    });
  };

  isCloseModal = () => {
    this.setState({ onModal: false });
    window.removeEventListener('keydown', event => {
      if (event.code === 'Escape') this.setState({ onModal: false });
    });
  };

  visibleBtnLoadMore = btnLM => {
    this.setState({ onVisibleBtnLoadMore: btnLM });
  };

  onClickLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      submitSearch: false,
    }));
  };
  render() {
    return (
      <div>
        <Searchbar onSearchGallery={this.handleFormSubmit} />
        <ImageGallery
          galleryName={this.state.searchGallery}
          page={this.state.page}
          per_page={this.state.per_page}
          onSubmitForm={this.state.submitSearch}
          onModal={this.handleModal}
          onBtnLoadMore={this.visibleBtnLoadMore}
          urlLargeImage={this.handleModal}
        />
        {this.state.onModal && (
          <Modal
            urlModal={this.state.urlLargeImage}
            closeModal={this.isCloseModal}
          />
        )}
        {this.state.onVisibleBtnLoadMore && (
          <Button onBtnLM={this.onClickLoadMore} />
        )}
      </div>
    );
  }
}
