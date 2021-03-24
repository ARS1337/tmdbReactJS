import React, { useState } from "react";
import { data } from "../utils/interfaces";
import getData from "./fetchhh";

interface Props {
  data: data;
}

const MovieDetails: React.FC<Props> = ({ data }) => {
  return (
    <li
      className="moviedetails"
      key={data.key}
      onClick={() => {
        getData(
          "/movie/" +
            data.id +
            "/external_ids?api_key=7ba1c2f1e41171dea1127d4aa8237c9d"
        ).then((r) => {
          window.open("https://www.imdb.com/title/" + r.imdb_id + "/", "blank");
          console.log(r);
        });
      }}
    >
      <div className="title">{data.original_title}</div>
      <img src={"https://image.tmdb.org/t/p/w185" + data.poster_path} />
      <div className="overview">{data.overview}</div>
      <div className="moviedate">
        <div>{"Released on: " + data.release_date}</div>
        <div>{"Language: " + data.original_language}</div>
        {data.adult ? <div>Rating: Adults Only</div> : <div>Rating: All </div>}
      </div>
      <hr />
    </li>
  );
};

export default MovieDetails;
