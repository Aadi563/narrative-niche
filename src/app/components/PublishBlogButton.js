"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function PublishBlogButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <Link href={"./new-blog/"} className="btn btn-secondary rounded-md">
        Publish Blog
      </Link>
    );
  }
  return <></>;
}
