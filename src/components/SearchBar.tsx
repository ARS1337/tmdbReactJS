import React, { useRef, useEffect } from "react";

interface Props {
  text: string;
  onChangeText: (text: string) => void;
  searchMovies: () => void;
}

const SearchBar: React.FC<Props> = ({ text, onChangeText, searchMovies }) => {
  const input: any = useRef(null);
  const focusSearchBar = () => {
    input.current.focus();
  };
  useEffect(() => {
    focusSearchBar();
  });

  return (
    <div className="searchbar">
      <input
        type="text"
        value={text}
        onChange={(e) => {
          onChangeText(e.target.value);
        }}
        ref={input}
      />
      <button
        onClick={() => {
          searchMovies();
        }}
      >
        Search Movies...
      </button>
    </div>
  );
};

export default SearchBar;
