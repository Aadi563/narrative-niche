import Image from "next/image";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";

const SingleBlogCard = (props) => {
  const sanitizedContent = DOMPurify.sanitize(
    props.elem.overview
  );
  return (
    <div className="card w-96 bg-base-100 shadow-xl rounded-md overflow-hidden">
      <figure>
        <Image
          src={props.elem.coverImage}
          className="min-h-60 max-h-72 h-auto w-full object-scale-down"
          quality={100}
          width={2000}
          height={2000}
          alt={props.elem.title}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{props.elem.title}</h2>
        <div
          className="overflow-hidden"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
        <div className="card-actions justify-end">
          <Link className="btn btn-primary rounded-md" href={`./blog/${props.elem._id}`}>
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleBlogCard;
