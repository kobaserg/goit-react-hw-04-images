import React from 'react';
import Notiflix from 'notiflix';
import PropTypes from 'prop-types';
import {
  Search,
  SearchForm,
  SearchFormButton,
  SearchFormBtnLabel,
  SearchFormInput,
} from './Searchbar.styled';

export class Searchbar extends React.Component {
  state = {
    searchForm: '',
  };
  handleSearchForm = event => {
    this.setState({ searchForm: event.target.value });
  };

  handleSubmitSearchForm = event => {
    event.preventDefault();
    if (this.state.searchForm === '') {
      Notiflix.Notify.warning('Enter a search term');
      return;
    }
    this.props.onSearchGallery(this.state.searchForm);
    this.setState({ searchForm: '' });
  };

  render() {
    return (
      <Search>
        <SearchForm onSubmit={this.handleSubmitSearchForm}>
          <SearchFormButton type="submit">
            <SearchFormBtnLabel>Search</SearchFormBtnLabel>
          </SearchFormButton>

          <SearchFormInput
            class="input"
            type="text"
            namt="searchform"
            value={this.state.searchForm}
            onChange={this.handleSearchForm}
            autocomplete="off"
            // autofocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Search>
    );
  }
}

Searchbar.propTypes = {
  props: PropTypes.object,
};
