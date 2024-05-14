import BlogCards from "./components/BlogCards";
import connectToDatabase from "./api/db/db";
import limitedBlogsDataFetch from "@/app/lib/fetchLimitedBlogs";

export default async function Home() {
  const INITIAL_NUMBER_OF_BLOGS = 6;
  const NUMBER_OF_BLOGS_TO_FETCH = 3;
  let initialBlogs;

  try {
    await connectToDatabase();
    initialBlogs = await limitedBlogsDataFetch(0, INITIAL_NUMBER_OF_BLOGS);
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    // Handle the error appropriately in your UI
    return;
  }
  // Consider adding a loading state here
  return (
    <main className="text-slate-800 dark:text-slate-300">
      <BlogCards initialBlogs={initialBlogs.data} NumberOfBlogsToFetch={NUMBER_OF_BLOGS_TO_FETCH}/>
    </main>
  );
}
