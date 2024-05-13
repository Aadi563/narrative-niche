"use client";
import React, { useState, useRef, forwardRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import AlertError from "../components/AlertError";
import AlertSuccess from "../components/AlertSuccess";
import { useRouter } from "next/navigation";
import DOMPurify from "isomorphic-dompurify";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
const JoditEditorWithRef = forwardRef((props, ref) => (
  <JoditEditor {...props} ref={ref} />
));
JoditEditorWithRef.displayName = "JoditEditorWithRef";

async function savePost(title, content, overview, imageURL, author) {
  try {
    let formdata = new FormData();
    formdata.append("title", title);
    formdata.append("content", content);
    formdata.append("overview", overview);
    formdata.append("author", author);
    formdata.append("files", imageURL);
    const response = await fetch("http://localhost:3000/api/blogs/", {
      method: "POST",
      body: formdata,
    });
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error(`An error occurred while saving the post: ${error.message}`);
    return error;
  }
}
export default function Page() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isSuccessAlertVisible, setIsSuccessAlertVisible] = useState(false);
  const [isErrorAlertVisible, setIsErrorAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const titleRef = useRef(null);
  const editorRef = useRef(null);
  const overviewRef = useRef(null);
  const coverImageRef = useRef(null);
  const titleTotalLengthRef = useRef(null);
  const overviewTotalLengthRef = useRef(null);
  const [content, setContent] = useState("");
  const [imageURL, setImageURL] = useState("");
  useEffect(() => {
    if (!session) return router.push("/");
  }, []);

  return (
    <>
      <AlertError message={alertMessage} isVisible={isErrorAlertVisible} />
      <AlertSuccess message={alertMessage} isVisible={isSuccessAlertVisible} />
      <form
        onSubmit={async (e) => {
          e.preventDefault();
            const response = await savePost(
              DOMPurify.sanitize(titleRef.current.value),
              DOMPurify.sanitize(content),
              DOMPurify.sanitize(overviewRef.current.value),
              imageURL,
              session.user.name
            );
            if(response.statusCode == 200){
              setAlertMessage("Post saved successfully!");
              setIsSuccessAlertVisible(true);
              setTimeout(() => {
                router.push("/");
              }, 2000);
            }
          }
        }
      >
        <div
          ref={editorRef}
          className="flex flex-col justify-center items-center my-10 gap-10 px-8 md:px-96"
        >
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-2xl">Title</span>
            </div>
            <input
              ref={titleRef}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              required={true}
              maxLength={100}
              onChange={(e) => {
                titleTotalLengthRef.current.innerHTML = `Total Length:- ${e.target.value.length} characters`;
              }}
            />
            <div className="label">
              <span className="label-text-alt text-slate-400">
                Maximum Length:- 100 characters
              </span>
              <span
                ref={titleTotalLengthRef}
                className="label-text-alt text-slate-400"
              >
                Total Length:- 0 characters
              </span>
            </div>
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-2xl">Overview</span>
            </div>
            <input
              ref={overviewRef}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              required={true}
              maxLength={255}
              onChange={(e) => {
                overviewTotalLengthRef.current.innerHTML = `Total Length:- ${e.target.value.length} characters`;
              }}
            />
            <div className="label">
              <span className="label-text-alt text-slate-400">
                Maximum Length:- 255 characters
              </span>
              <span
                ref={overviewTotalLengthRef}
                className="label-text-alt text-slate-400"
              >
                Total Length:- 0 characters
              </span>
            </div>
          </label>
          <label className="form-control w-full h-full">
            <div className="label">
              <span className="label-text text-2xl">Content</span>
            </div>
            <JoditEditorWithRef
              className="min-h-[80rem]"
              ref={editorRef}
              value={content}
              tabIndex={1}
              onBlur={(newContent) => setContent(newContent)}
            />
          </label>
          <label className="form-control w-full h-full">
            <div className="label">
              <span className="label-text text-2xl">Cover Image</span>
            </div>
            <div className="container flex justify-center items-center">
              <input
                ref={coverImageRef}
                className="w-full"
                type="file"
                id="img"
                name="files"
                accept="image/*"
                required={true}
              />
              <button
                type="button"
                className="btn btn-primary join-item w-32 rounded-md"
                onClick={() => {
                  setImageURL(coverImageRef.current.files[0]);
                }}
              >
                Upload
              </button>
            </div>
          </label>
          <div className="join">
            <button
              type="submit"
              className="btn btn-primary join-item w-32 rounded-md"
            >
              Publish
            </button>
            <button
              type="button"
              className="btn btn-error join-item w-32 rounded-md"
              onClick={() => {
                setContent("");
                titleRef.current.value = "";
                coverImageRef.current.value = "";
                setIsSuccessAlertVisible(true);
                setAlertMessage("Form reset successfully!");
                setTimeout(() => {
                  setIsSuccessAlertVisible(false);
                }, 2000);
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
