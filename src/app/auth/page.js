"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import AlertSuccess from "../components/AlertSuccess";
import { useState } from "react";

export default function Page() {
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <AlertSuccess message={alertMessage} isVisible={isAlertVisible} />
        <div className="w-full h-screen flex flex-col justify-center items-center">
          <div className="w-44 h-44 relative mb-4">
            <Image
              src={session.user.image}
              fill
              alt=""
              className="object-cover rounded-full"
            />
          </div>
          <p className="text-2xl mb-2">
            Welcome <span className="font-bold">{session.user.name}</span>.
            Signed In As
          </p>
          <p className="font-bold mb-4">{session.user.email}</p>
          <button
            className="bg-red-600 py-2 px-6 rounded-md"
            onClick={() => {
              setTimeout(async () => {
                await signOut();
              }, 1000);
              setIsAlertVisible(true);
              setAlertMessage("Signed out successfully!");
            }}
          >
            Sign out
          </button>
        </div>
      </>
    );
  }
  return (
    <>
      <AlertSuccess message={alertMessage} isVisible={isAlertVisible} />
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <p className="text-2xl mb-2">Not Signed In</p>
        {/* <button
          className="bg-none border-gray-300 border py-2 px-6 rounded-md mb-2"
          onClick={() => {
            setTimeout(async () => {
              await signIn("github");
            }, 1000);
            setIsAlertVisible(true);
            setAlertMessage("Signed in successfully!");
          }}
        >
          Sign in with github
        </button> */}
        <button
          className="bg-blue-600 py-2 px-6 rounded-md mb-2 text-slate-50"
          onClick={() => {
            setTimeout(async () => {
              await signIn("google");
            }, 1000);
            setIsAlertVisible(true);
            setAlertMessage("Signed in successfully!");
          }}
        >
          Sign in with google
        </button>
      </div>
    </>
  );
}
