"use client"
import { createRoot } from 'react-dom';
import { useEffect, useRef, useState } from "react";
import Link from 'next/link';

const Search = (props) => {
    let suggestionListRef = useRef(null);
    let searchBoxRef = useRef(null);
    const [inputValueDetector, setInputValueDetector] = useState();
    useEffect(() => {
        let arr = [];
        props.data.forEach((elem) => {
          arr.push({"title":elem.title, "id":elem._id});
        });
        if (searchBoxRef.current.value.length === 0) {
          suggestionListRef.current.innerHTML = "";
          return;
        }
        let regex = RegExp(searchBoxRef.current.value.trim(), "i");
        suggestionListRef.current.innerHTML = "";
        let i = 0;
        arr.forEach((str) => {
          if(i >= 10) return;
          if (regex.exec(str.title) === null) {
            return;
          }
          const liElement = document.createElement("li");
          const anchor = document.createElement("a");
          anchor.href = "./blog/" + str.id;
          anchor.appendChild(liElement);
          liElement.className = `text-2xl p-2 hover:bg-slate-50`
          for (let i = 0; i < str.title.length; i++) {
            if (
              i >= regex.exec(str.title)["index"] &&
              i <
                parseInt(regex.exec(str.title)["index"]) +
                  parseInt(searchBoxRef.current.value.length)
            ) {
              liElement.innerHTML += `<span style='font-size:1.6rem;
                font-weight:bold;'>${str.title[i]}</span>`;
            } else {
              liElement.innerHTML += `<span>${str.title[i]}</span>`;
            }
          }
          suggestionListRef.current.appendChild(anchor);
          i++;
        });
      }, [inputValueDetector]);
  return (
    <div className="form-control w-80 hidden sm:flex">
      <div className="flex overflow-hidden border w-80 items-center rounded-md">
        <svg
          className="py-1 px-0 w-12 h-10"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path>
        </svg>
        <input
          ref={searchBoxRef}
          id="search-box"
          type="text"
          priority="true"
          placeholder="Search Articles..."
          className="px-0 outline-0 border-0 input md:w-full"
          onInput={() => {
            setInputValueDetector(searchBoxRef.current.value);
          }}
        />
      </div>
      <ul
        ref={suggestionListRef}
        id="suggestion-list"
        tabIndex={0}
        className="absolute top-16 dropdown-content z-[2] shadow bg-base-100 rounded-box w-80"
      ></ul>
    </div>
  );
};

export default Search;
