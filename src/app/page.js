import BlogCards from "./components/BlogCards";
import connectToDatabase from "./api/db/db";
import limitedBlogsDataFetch from "@/app/lib/fetchLimitedBlogs";

export default async function Home() {
  await connectToDatabase();
  const INITIAL_NUMBER_OF_BLOGS = 6;
  const NUMBER_OF_BLOGS_TO_FETCH = 3;
  const initialBlogs = await limitedBlogsDataFetch(0, INITIAL_NUMBER_OF_BLOGS);
  return (
    <main>
      <BlogCards initialBlogs={initialBlogs.data} NumberOfBlogsToFetch={NUMBER_OF_BLOGS_TO_FETCH}/>
    </main>
  );
}
