import React from "react";
import MovieDetails from "./MovieDetails";
import { data } from "../utils/interfaces";

interface Props {
  list: data[];
  loading: boolean;
}

const MovieList: React.FC<Props> = ({ list, loading }) => {
  console.log("MovieList", list);

  return (
    <>
      <ul className="movielist">
        {loading ? (
          <div className="loader"></div>
        ) : (
          <ul>
            {list.map((x) => (
              <MovieDetails data={x} />
            ))}
          </ul>
        )}
      </ul>
    </>
  );
};
export default MovieList;
