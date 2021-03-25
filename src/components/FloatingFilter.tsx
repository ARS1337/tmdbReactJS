import React, { useImperativeHandle } from "react";
import { data } from "../utils/interfaces";

interface Props {
  list: data[];
  changeHandler: () => void;
  clearFilter: () => void;
}

const FloatingFilter = React.forwardRef<any, Props>((props, ref) => {
  let dateRef: any = React.useRef<HTMLInputElement>(null);
  let languageRef: any = React.useRef<HTMLInputElement>(null);

  let tempLanguage: string[] = [];
  let tempDate: string[] = [];

  useImperativeHandle(ref, () => ({
    get date() {
      return dateRef.current;
    },
    get language() {
      return languageRef.current;
    },
  }));

  props.list.map((x) => {
    if (!tempDate.includes(x.release_date.toString().substr(0, 4))) {
      tempDate.push(x.release_date.toString().substr(0, 4));
    }
  });

  props.list.map((x) => {
    if (!tempLanguage.includes(x.original_language)) {
      tempLanguage.push(x.original_language);
    }
  });

  return (
    <div className="filter">
      <button
        onClick={() => {
          props.clearFilter();
        }}
      >
        clear filter
      </button>

      <label htmlFor="language">Language:</label>
      <select
        ref={languageRef}
        onChange={() => {
          props.changeHandler();
        }}
        id="language"
      >
        {tempLanguage.map((x) => (
          <option value={x}>{x}</option>
        ))}
      </select>

      <label htmlFor="date"> Released after:</label>
      <select
        ref={dateRef}
        onChange={() => {
          props.changeHandler();
        }}
        id="date"
      >
        {tempDate.map((x) => (
          <option value={x}>{x}</option>
        ))}
      </select>
    </div>
  );
});

export default FloatingFilter;
