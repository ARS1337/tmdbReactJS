import "./App.css";
import MovieList from "./components/MovieList";
import React, { useState, useEffect } from "react";
import getData from "./components/fetchhh";
import SearchBar from "./components/SearchBar";
import { data } from "./utils/interfaces";
import FloatingFilter from "./components/FloatingFilter";
import { ThemeProvider, useTheme } from "./components/Theme";

function App() {
  let temp1: data = {
    key: "1",
    adult: false,
    id: "555",
    original_language: "zh",
    original_title: "急先锋",
    overview: "Covert ",
    poster_path: "/mKvw1Ic9enfFlCPBNJGiejRPMUO.jpg",
    release_date: new Date("2020 - 09 - 30"),
  };
  let [list, setList] = useState([temp1]);
  const [loading, setLoading] = useState(true);

  let searchMovies = (text: string, setList: any) => {
    setLoading(true);
    getData(
      `/search/movie?api_key=7ba1c2f1e41171dea1127d4aa8237c9d&language=en-US&query=${text}&page=1&include_adult=false`
    )
      .then((r) => {
        console.log("serchMovies noerror");
        if (typeof r.results !== "undefined" && r.results.length > 0) {
          setLoading(false);
          setList(r.results);
          setTemp(r.results);
          inputRef.current.language.value = "";
          inputRef.current.date.value = "";
        } else {
          {
            alert("No Movies Found! Try Searching Something Else");
          }
        }
      })
      .catch((e) => {
        console.log("serchMovies error");
        console.log(e);
        alert("An error occured " + e);
      });
  };

  useEffect(() => {
    setLoading(true);
    getData(
      "/discover/movie?api_key=7ba1c2f1e41171dea1127d4aa8237c9d&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1"
    ).then((r) => {
      setLoading(false);
      setList(r.results);
      setTemp(r.results);
      inputRef.current.language.value = "";
      inputRef.current.date.value = "";
    });
  }, []);

  let searchRef = React.useRef<HTMLInputElement>(null);
  const inputRef: any = React.useRef();
  const [temp, setTemp] = useState(list);

  let changeHandler = () => {
    let temp = list;
    let tempRef = inputRef.current;

    console.log("ChangeHandler", tempRef.language.value, tempRef.date.value);

    if (tempRef.language.value.toString().length == 2) {
      console.log("language executed", tempRef.language.value.toString());

      temp = temp.filter(
        (x) => x.original_language == tempRef.language.value.toString()
      );
    }

    if (tempRef.date.value.toString().length > 0) {
      console.log("date executed", tempRef.date.value.toString());

      temp = temp.filter((x) => {
        return (
          new Date(x.release_date.toString().substr(0, 4)) >=
          new Date(tempRef.date.value.toString().substr(0, 4))
        );
      });
    }
    setTemp(temp);
  };

  let clearFilter = () => {
    inputRef.current.language.value = "";
    inputRef.current.date.value = "";
    changeHandler();
    console.log("cleared filters");
    console.log(inputRef.current.language.value, inputRef.current.date.value);
  };

  return (
    <div className="App">
      <ThemeProvider>
        <SearchBar
          ref={searchRef}
          searchMovies={() => {
            if (searchRef.current != null)
              searchMovies(searchRef.current.value, setList);
          }}
        />
      </ThemeProvider>

      <MovieList list={temp} loading={loading} />
      <FloatingFilter
        list={list}
        ref={inputRef}
        changeHandler={changeHandler}
        clearFilter={clearFilter}
      />
    </div>
  );
}

export default App;
