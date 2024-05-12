"use client";
import { useEffect, useRef, useState } from "react";

const MobileSearch = (props) => {
  const searchModalRef = useRef(null);
  let mobileSearchBoxRef = useRef(null);
  let mobileSuggestionListRef = useRef(null);
  const [inputValueDetector, setInputValueDetector] = useState();
  useEffect(() => {
    let arr = [];
    props.data.forEach((elem) => {
      arr.push({"title":elem.title, "id":elem._id});
    });
    if (mobileSearchBoxRef.current.value.length === 0) {
      mobileSuggestionListRef.current.innerHTML = "";
      return;
    }
    let regex = RegExp(mobileSearchBoxRef.current.value.trim(), "i");
    mobileSuggestionListRef.current.innerHTML = "";
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
      liElement.style.fontSize = "1.5rem";
      liElement.style.padding = "8px";
      for (let i = 0; i < str.title.length; i++) {
        if (
          i >= regex.exec(str.title)["index"] &&
          i <
            parseInt(regex.exec(str.title)["index"]) +
              parseInt(mobileSearchBoxRef.current.value.length)
        ) {
          liElement.innerHTML += `<span style='font-size:1.6rem;
            font-weight:bold;'>${str.title[i]}</span>`;
        } else {
          liElement.innerHTML += `<span>${str.title[i]}</span>`;
        }
      }
      mobileSuggestionListRef.current.appendChild(anchor);
      i++;
    });
  }, [inputValueDetector]);
  return (
    <>
      <svg
        className="py-1 px-0 w-8 h-8 md:hidden sm:flex"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        onClick={() => searchModalRef.current.showModal()}
      >
        <path fill="none" d="M0 0h24v24H0z"></path>
        <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path>
      </svg>
      <dialog
        ref={searchModalRef}
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <ul
            ref={mobileSuggestionListRef}
            id="suggestion-list"
            tabIndex={0}
            className="mb-2 border-0 dropdown-content z-[2] bg-base-100 rounded-box w-full"
          ></ul>
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
              ref={mobileSearchBoxRef}
              id="search-box"
              type="text"
              priority="true"
              placeholder="Search Articles..."
              className="px-0 outline-0 border-0 input md:w-full"
              onInput={() => {
                setInputValueDetector(mobileSearchBoxRef.current.value);
              }}
            />
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default MobileSearch;
