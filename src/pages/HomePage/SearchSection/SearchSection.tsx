import { FC } from 'react';
import './SearchSection.css';

interface SearchSectionProps {
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const SearchSection: FC<SearchSectionProps> = ({ onChangeHandler, value }) => {
  return (
    <main className="search-container">
      <input
        className="search-input"
        placeholder="search here..."
        onChange={(e) => onChangeHandler(e)}
        value={value}
      />
    </main>
  );
};

export default SearchSection;
