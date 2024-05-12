import BlogCards from "./components/BlogCards";
import connectToDatabase from "./api/db/db";
import limitedBlogsDataFetch from "@/app/lib/fetchLimitedBlogs";
import allblogsDataFetch from "@/app/lib/fetchAllBlogs";

export default async function Home() {
  await connectToDatabase();
  const INITIAL_NUMBER_OF_BLOGS = 6;
  const NUMBER_OF_BLOGS_TO_FETCH = 3;
  const initialBlogs = await limitedBlogsDataFetch(0, INITIAL_NUMBER_OF_BLOGS);
  const totalNumberOfBlogs = await allblogsDataFetch();
  return (
    <main>
      <BlogCards initialNumberOfBlogs={INITIAL_NUMBER_OF_BLOGS} initialBlogs={initialBlogs} NumberOfBlogsToFetch={NUMBER_OF_BLOGS_TO_FETCH} totalNumberOfBlogs={totalNumberOfBlogs.length}/>
    </main>
  );
}
