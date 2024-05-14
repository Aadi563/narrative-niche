"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function PublishBlogButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <Link href={"./new-blog/"} className="outline-none border-none animate-gradient-x btn bg-gradient-to-r from-gray-300 to-gray-600 hover:bg-gradient-to-bl hover:animate-gradient-y text-slate-800 dark:text-slate-100">
        Publish Blog
      </Link>
    );
  }
  return <></>;
}
