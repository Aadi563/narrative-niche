import Image from "next/image";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";

const SingleBlogCard = (props) => {
  const sanitizedContent = DOMPurify.sanitize(props.elem.overview);
  return (
    <>
      <div className="max-h-[30rem] h-[30rem] w-[25rem] hover:shadow-black dark:hover:shadow-white shadow-2xl card max-w-[25rem] bg-base-100 rounded-xl overflow-hidden hover:scale-105 text-slate-300">
        <figure>
          <Image
            src={props.elem.coverImage}
            className="h-full w-full max-h-[23rem]"
            quality={100}
            width={2000}
            height={2000}
            alt={props.elem.title}
          />
        </figure>
        <div className="card-body justify-between">
          <div className="card-title break-all">{props.elem.title}</div>
          <div
            className="overflow-hidden"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />
          <div className="card-actions justify-end">
            <Link
              className="animate-gradient-x btn bg-gradient-to-r from-gray-300 to-gray-600 hover:bg-gradient-to-bl hover:animate-gradient-y text-slate-800 dark:text-slate-100"
              href={`./blog/${props.elem._id}`}
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBlogCard;
