import React from "react";

interface Props {
  searchMovies: () => void;
}
const SearchBar = React.forwardRef<HTMLInputElement, Props>((props, ref) => (
  <div className="searchbar">
    <input ref={ref} type="text" />
    <button
      onClick={() => {
        props.searchMovies();
      }}
    >
      Search Movies...
    </button>
  </div>
));

export default SearchBar;
