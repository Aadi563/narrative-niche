"use client";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';

export default function Profile() {
  const router = useRouter();
  const { data: session } = useSession();
  if (session) {
    return (
      <div className="rounded-md dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-10 rounded-full">
            <Image
              width={100}
              height={100}
              alt="Tailwind CSS Navbar component"
              src={session.user.image}
            />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
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
              onClick={() => {
                router.push('/')
                signOut();
              }}
            >
              Logout
            </div>
          </li>
        </ul>
      </div>
    );
  }
  return (
    <Link href={"./auth"}>
      <button className="btn rounded-md btn-active btn-primary">Login</button>
    </Link>
  );
}
