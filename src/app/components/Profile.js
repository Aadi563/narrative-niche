"use client";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AlertSuccess from "./AlertSuccess";
import { useState } from "react";

export default function Profile() {
  const router = useRouter();
  const [isSuccessAlertVisible, setIsSuccessAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const { data: session } = useSession();
  if (session) {
    return (
      <>
      <AlertSuccess message={alertMessage} isVisible={isSuccessAlertVisible} />
      <div className="rounded-md dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-10 rounded-full">
            <Image
              quality={100}
              width={2000}
              height={2000}
              alt="Tailwind CSS Navbar component"
              src={session.user.image}
            />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="rounded-md mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 w-52"
        >
          {/* <li>
            <a className="justify-between">
              Profile
            </a>
          </li>
          <li>
            <a>Settings</a>
          </li>` */}
          <li>
            <div
            className="text-slate-100"
              onClick={() => {
                router.push("/");
                setIsSuccessAlertVisible(true);
                setAlertMessage("Signed out successfully!");
                setTimeout(()=>{
                  signOut();
                }, 1000)
              }}
            >
              Logout
            </div>
          </li>
        </ul>
      </div>
      </>
    );
  }
  return (
    <Link href={"./auth"}>
      <button className="btn outline-none border-none animate-gradient-x bg-gradient-to-r from-gray-300 to-gray-600 hover:bg-gradient-to-bl hover:animate-gradient-y rounded-md btn-active text-slate-800 dark:text-slate-100">Login</button>
    </Link>
  );
}
