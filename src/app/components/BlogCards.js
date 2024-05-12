"use client";
import { useEffect, useRef, useState } from "react";
import SingleBlogCard from "@/app/components/SingleBlogCard";
import limitedBlogsDataFetch from "@/app/lib/fetchLimitedBlogs";
import { useInView } from "react-intersection-observer";
import Loading from "@/app/components/Loading";

const BlogCards = (props) => {
  const [offset, setOffset] = useState(props.initialNumberOfBlogs);
  const [blogs, setBlogs] = useState(props.initialBlogs);
  const { ref, inView } = useInView();
  const loaderRef = useRef(null);
  const loadMoreUsers = async () => {
    const apiBlogs = await limitedBlogsDataFetch(
      offset,
      props.NumberOfBlogsToFetch
    );
    if(apiBlogs.length >0){
      setBlogs([...blogs, ...apiBlogs]);
      setOffset(offset + apiBlogs.length);
    }
    else{
      loaderRef.current.style.display = "none";
    }
  };
  useEffect(() => {
    setBlogs(props.initialBlogs);
  }, [props.initialBlogs]);
  useEffect(() => {
    if (inView) {
      loadMoreUsers();
    }
  }, [inView]);
  return (
    <div className="flex flex-wrap justify-center items-center py-10 px-5 gap-10 md:px-20
    md:justify-between">
      {props.initialBlogs.length == 0?<div className="flex w-full justify-center items-center">No Blogs available currently!</div>:
      <>{blogs.map((elem, id) => (
        <SingleBlogCard key={id} elem={elem} />
      ))}
      <div className="flex justify-center items-center w-full" ref={ref}>
        <div ref={loaderRef}>
        <Loading  />
        </div>
      </div></>}
    </div>
  );
};

export default BlogCards;