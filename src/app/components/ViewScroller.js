"use client";

import { useEffect, useRef } from "react";

const ViewScroller = () => {
  const progessRef = useRef(null);
  useEffect(() => {
    window.addEventListener("scroll", function () {
      let scrolledY = window.scrollY || document.documentElement.scrollTop;
      let winHeight =
        window.innerHeight || document.documentElement.clientHeight;
      let docHeight =
        document.body.scrollHeight || document.documentElement.scrollHeight;
      let scrollPercent = (scrolledY / (docHeight - winHeight)) * 100;
      progessRef.current!=null?progessRef.current.style.width =
        scrollPercent + "%":null;
    });
  }, []);

  return (
    <progress
      ref={progessRef}
      className="h-[0.3rem] progress w-full fixed top-0 left-0"
      value="100"
      max="100"
    ></progress>
  );
};

export default ViewScroller;
