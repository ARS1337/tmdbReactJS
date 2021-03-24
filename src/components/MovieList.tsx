import React, { useState } from "react";
import FloatingFilter from "./FloatingFilter";
import MovieDetails from "./MovieDetails";
import { data } from "../utils/interfaces";

interface Props {
  list: data[];
  loading: boolean;
}

const MovieList: React.FC<Props> = ({ list, loading }) => {
  const [language, setLanguage] = useState("");
  const [date, setDate] = useState("");
  let temp = list;
  console.log(list);

  if (language.length == 2) {
    temp = list.filter((x) => x.original_language == language);
    console.log("ssdsfdsfsdfsd");
  }
  if (date.length > 0) {
    temp = temp.filter((x) => {
      return (
        new Date(x.release_date.toString().substr(0, 4)) >
        new Date(date.toString().substr(0, 4))
      );
    });
    console.log("ffffffffff");
  }

  return (
    <>
      <ul className="movielist">
        {loading ? (
          <div className="loader"></div>
        ) : (
          <ul>
            {temp.map((x) => (
              <MovieDetails data={x} />
            ))}
          </ul>
        )}
      </ul>
      <FloatingFilter
        setDate={setDate}
        setLanguage={setLanguage}
        date={date}
        language={language}
        list={list}
      />
    </>
  );
};

export default MovieList;
