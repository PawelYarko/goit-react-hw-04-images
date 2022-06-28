import { useState } from 'react';
import IconSearch from './IconSearch/IconSearch';
import s from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputFormChange = e => {
    const value = e.currentTarget.value;
    setInputValue(value.toLowerCase());
  };

  const handleFormSubmit = e => {
    e.preventDefault();

    if (inputValue.trim() === '') {
      return;
    }

    onSubmit(inputValue);
    setInputValue('');
  };

  return (
    <header className={s.searchbar}>
      <form className={s.form} onSubmit={handleFormSubmit}>
        <button type="submit" className={s.button}>
          <IconSearch />
          <span className={s.label}>Search</span>
        </button>

        <input
          onChange={handleInputFormChange}
          className={s.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}
