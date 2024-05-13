"use client";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import isUsernameExists from "../lib/isUsernameExists";
import AlertError from "../components/AlertError";
import AlertSuccess from "../components/AlertSuccess";
import DOMPurify from "isomorphic-dompurify";
import { useRouter } from "next/navigation";

async function saveUser(username, bio, email) {
  try {
    let formdata = new FormData();
    formdata.append("username", username);
    formdata.append("bio", bio);
    const response = await fetch("http://localhost:3000/api/users/", {
      method: "PUT",
      body: formdata,
    });
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error(
      `An error occurred while saving the user details: ${error.message}`
    );
    return error;
  }
}
export default function Page() {
  const router = useRouter();
  const { data: session } = useSession();
  const bioTotalLengthRef = useRef(null);
  const usernameRef = useRef(null);
  const bioRef = useRef(null);
  const usernameExistanceRef = useRef(null);
  const [isSuccessAlertVisible, setIsSuccessAlertVisible] = useState(false);
  const [isErrorAlertVisible, setIsErrorAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [errors, setErrors] = useState({});
  if (session) {
    return (
      <>
        <AlertError message={alertMessage} isVisible={isErrorAlertVisible} />
        <AlertSuccess
          message={alertMessage}
          isVisible={isSuccessAlertVisible}
        />
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if(errors.invalidUsername == true){
              setIsErrorAlertVisible(true);
              setAlertMessage("Username exists try a different username!");
              setTimeout(() => {
                setIsErrorAlertVisible(false);
              }, 2000);
              return;
            }
            const response = await saveUser(
              DOMPurify.sanitize(usernameRef.current.value),
              DOMPurify.sanitize(bioRef.current.value)
            );
            if (response.statusCode == 200) {
              setAlertMessage("User details saved successfully!");
              setIsSuccessAlertVisible(true);
              setTimeout(() => {
                router.push("/");
              }, 2000);
            }
          }}
        >
          <div
            className="flex flex-col justify-center items-center my-10 gap-10 px-8 md:px-96"
          >
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text text-2xl">Username</span>
              </div>
              <input
                ref={usernameRef}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                required={true}
                onBlur={async (e) => {
                  const response = await isUsernameExists(e.target.value);
                  console.log(response);
                  if (response.statusCode !== 200) {
                    setErrors({invalidUsername:true});
                    e.target.className =
                      "input input-error input-bordered w-full";
                      usernameExistanceRef.current.innerHTML = response.message;
                      setIsErrorAlertVisible(true);
                      setAlertMessage("Username exists try a different username!");
                      setTimeout(() => {
                        setIsErrorAlertVisible(false);
                      }, 2000);
                  }
                  else{
                    setErrors({invalidUsername:false});
                    e.target.className =
                      "input input-success input-bordered w-full";
                      usernameExistanceRef.current.innerHTML = `valid username!`;
                      setIsSuccessAlertVisible(true);
                      setAlertMessage("Valid Username!");
                      setTimeout(() => {
                        setIsSuccessAlertVisible(false);
                      }, 2000);
                  }
                }}
              />
              <div className="label">
                <span ref={usernameExistanceRef} className="label-text-alt"></span>
              </div>
            </label>
            <label className="form-control w-full">
              <label className="form-control">
                <div className="label">
                  <span className="label-text text-2xl">
                    Your Bio(Optional)
                  </span>
                </div>
                <textarea
                  ref={bioRef}
                  className="textarea textarea-bordered min-h-64"
                  placeholder="Bio"
                  maxLength={500}
                  onChange={(e) => {
                    bioTotalLengthRef.current.innerHTML = `Total Length:- ${e.target.value.length} characters`;
                  }}
                ></textarea>
              </label>
              <div className="label">
                <span className="label-text-alt text-slate-400">
                  Maximum Length:- 500 characters
                </span>
                <span
                  ref={bioTotalLengthRef}
                  className="label-text-alt text-slate-400"
                >
                  Total Length:- 0 characters
                </span>
              </div>
            </label>
            <div className="join">
              <button
                type="submit"
                className="btn btn-primary join-item w-32 rounded-md"
              >
                Save
              </button>
              <button
                type="button"
                className="btn btn-error join-item w-32 rounded-md"
                onClick={() => {
                  usernameRef.current.value = "";
                  bioRef.current.value = "";
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
  } else {
    return <></>;
  }
}
