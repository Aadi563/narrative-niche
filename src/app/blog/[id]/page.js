import Image from "next/image";
import fetchBlogDetails from "@/app/lib/fetchBlogDetails";
import ViewScroller from "@/app/components/ViewScroller";
import Comments from "@/app/components/Comments";

export default async function Page({ params }) {
  const blogId = params.id;
  const currentBlog = await fetchBlogDetails(blogId);
  return (
    <div className="py-10 px-10 md:px-80">
      <ViewScroller />
      <div className="text-4xl md:text-5xl">{currentBlog.title}</div>
      <div className="text-sm text-slate-500 mb-10 mt-2">Uploaded on:- {currentBlog.createdAt.split("T")[0]} at {`${currentBlog.createdAt.split("T")[1]}`.split(":")[0]+":"+`${currentBlog.createdAt.split("T")[1]}`.split(":")[1]} {`${parseInt(`${currentBlog.createdAt.split("T")[1]}`.split(":")[0])>=12}`?"PM":"AM"} by {currentBlog.author}</div>
      <div className="bg-red-950 h-auto w-full my-10">
        <Image
          src={currentBlog.coverImage}
          width={2000}
          height={2000}
          quality={100}
          style={{ width: "100%", height: "100%", maxHeight: "400px" }}
          alt={currentBlog.title}
        />
      </div>
      <div
        className="text-justify text-wrap break-words "
        dangerouslySetInnerHTML={{ __html: currentBlog.content}}
      />
      {/* <Comments /> */}
    </div>
  );
}
