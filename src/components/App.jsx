import { Component } from 'react';
import  Searchbar from './Searchbar/Searchbar';
import { fetchImages } from './api/fetchImages';
import  ImageGallery  from './ImageGallery/ImageGallery';
import  Button  from './Button/Button';
import Loader from './Loader/Loader';
import  Modal  from './Modal/Modal';
import React from 'react';
import styles from '../index.css';

export class App extends Component {
  state = {
    images: [],
    isLoading: false,
    currentSearch: '',
    pageNr: 1,
    modalOpen: false,
    modalImg: '',
    modalAlt: '',
  };

  handleSubmit = async e => {
    e.preventDefault();
    const inputForSearch = e.target.elements.inputForSearch;
    const searchValue = inputForSearch.value.trim();
    if (searchValue === '') {
      return;
    }
    this.setState({ isLoading: true });
    const response = await fetchImages(searchValue, this.state.pageNr); // Poprawiono przekazywanie pageNr
    this.setState({
      images: response,
      isLoading: false,
      currentSearch: searchValue,
      pageNr: 1, // Ustawiono pageNr na 1 po wykonaniu nowego wyszukiwania
    });
  };

  handleClickMore = async () => {
    const { currentSearch, pageNr } = this.state;
    const response = await fetchImages(currentSearch, pageNr + 1);
    this.setState(prevState => ({
      images: [...prevState.images, ...response],
      pageNr: prevState.pageNr + 1,
    }));
  };

  handleImageClick = (url, alt) => {
    this.setState({
      modalOpen: true,
      modalAlt: alt,
      modalImg: url,
    });
  };

  handleModalClose = () => {
    this.setState({
      modalOpen: false,
      modalImg: '',
      modalAlt: '',
    });
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.handleModalClose();
    }
  };

  render() {
    const { isLoading, images, modalOpen, modalImg, modalAlt } = this.state;

    return (
      <div className={styles.Loader}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Searchbar onSubmit={this.handleSubmit} />
            <ImageGallery
              onImageClick={this.handleImageClick}
              images={images}
            />
            {images.length > 0 && (
              <div className={styles.CenterButton}>
                {images.length > 0 && (
                  <Button onClick={this.handleClickMore}>Load more</Button>
                )}
              </div>
            )}
          </>
        )}
        {modalOpen && (
          <Modal
            src={modalImg}
            alt={modalAlt}
            handleClose={this.handleModalClose}
          />
        )}
      </div>
    );
  }
}