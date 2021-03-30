import React from "react";
import { useTheme } from "./Theme";

interface Props {
  searchMovies: () => void;
}
const SearchBar = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="searchbar">
      <input ref={ref} type="text" />
      <button
        onClick={() => {
          props.searchMovies();
        }}
      >
        Search Movies...
      </button>
      <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        {theme === "dark" ? "Switch to light mode" : "switch to dark mode"}
      </button>
    </div>
  );
});

export default SearchBar;
