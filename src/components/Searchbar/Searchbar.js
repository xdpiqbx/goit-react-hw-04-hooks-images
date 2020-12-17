import { Component } from 'react';

import s from './Searchbar.module.scss';

class Searchbar extends Component {
  state = {
    value: '',
  };

  getValue = event => {
    this.setState({
      value: event.target.value,
    });
  };

  onSubmitHandler = event => {
    event.preventDefault();
    this.props.onSubmitHandler(this.state.value);
    this.setState({
      value: '',
    });
  };

  render() {
    const { value } = this.state;
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.onSubmitHandler}>
          <input
            className={s.SearchFormInput}
            type="text"
            onChange={this.getValue}
            value={value}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}>Search</span>
          </button>
        </form>
      </header>
    );
  }
}

export default Searchbar;
