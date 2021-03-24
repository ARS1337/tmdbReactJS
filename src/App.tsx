import "./App.css";
import MovieList from "./components/MovieList";
import React, { useState, useEffect } from "react";
import getData from "./components/fetchhh";
import SearchBar from "./components/SearchBar";

function App() {
  let [list, setList] = useState([]);
  const [text, onChangeText] = React.useState("Search...");
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
    });
  }, []);

  return (
    <div className="App">
      <SearchBar
        text={text}
        onChangeText={onChangeText}
        searchMovies={() => {
          searchMovies(text, setList);
        }}
      />
      <MovieList list={list} loading={loading} />
    </div>
  );
}

export default App;

// <>
// <ul className="movielist">
//   {loading ? (
//     <div className="loader"></div>
//   ) : (
//     <ul>
//       {list.map((x) => (
//         <MovieDetails data={x} />
//       ))}
//     </ul>
//   )}
// </ul>
// </>

// ()=>{
//   if(loading){
//     return <div className="loader"></div>
//   }else{
//     if(language.length==2){
//       temp = list.filter(x => x.original_language == language);
//     }
//     if(date!=null){
//       return temp.filter(x => {
//         return (
//           new Date(x.release_date.toString().substr(0, 4)) > new Date(date.substr(0, 4))
//         );
//       });
//     }
//     return <MovieDetails data={temp}/>
//   }
// }
