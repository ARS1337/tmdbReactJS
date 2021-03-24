import React from "react";
import { data } from "../utils/interfaces";

interface Props {
  list: data[];
  language: string;
  date: string;
  setLanguage: (text: string) => void;
  setDate: (text: string) => void;
}

const FloatingFilter: React.FC<Props> = ({
  list,
  language,
  date,
  setLanguage,
  setDate,
}) => {
  let tempLanguage: string[] = [];
  let tempDate: string[] = [];

  list.map((x) => {
    if (!tempDate.includes(x.release_date.toString().substr(0, 4))) {
      tempDate.push(x.release_date.toString().substr(0, 4));
    }
  });

  list.map((x) => {
    if (!tempLanguage.includes(x.original_language)) {
      tempLanguage.push(x.original_language);
    }
  });

  return (
    <div className="filter">
      <button
        onClick={() => {
          setDate("");
          setLanguage("");
          console.log("cleared filters");
        }}
      >
        clear filter
      </button>

      <label htmlFor="language">Language:</label>
      <select
        value={language}
        onChange={(e) => {
          setLanguage(e.target.value);
        }}
        id="language"
      >
        {tempLanguage.map((x) => (
          <option value={x}>{x}</option>
        ))}
      </select>
      <label htmlFor="date"> Released after:</label>
      <select
        value={date}
        onChange={(e) => {
          setDate(e.target.value);
        }}
        id="date"
      >
        {tempDate.map((x) => (
          <option value={x}>{x}</option>
        ))}
      </select>
    </div>
  );
};

export default FloatingFilter;
