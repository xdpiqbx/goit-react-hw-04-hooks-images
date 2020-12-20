import { useState } from 'react';

import s from './Searchbar.module.scss';

const Searchbar = props => {
  const [value, setValue] = useState('')

  const getValue = event => {
    setValue(event.target.value)
  };

  const onSubmitHandler = event => {
    event.preventDefault();
    props.onSubmitHandler(value);
    setValue('')
  };
  
  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={onSubmitHandler}>
        <input
          className={s.SearchFormInput}
          type="text"
          onChange={getValue}
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

export default Searchbar;