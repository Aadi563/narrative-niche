import allblogsDataFetch from "@/app/lib/fetchAllBlogs";
import Search from "./Search";
import MobileSearch from "./MobileSearch";
import ThemeChanger from "./ThemeChanger";
import Profile from "@/app/components/Profile";
import PublishBlogButton from "@/app/components/PublishBlogButton";

const Navbar = async () => {
  const data = await allblogsDataFetch();
  return (
    <div className="flex justify-between items-center navbar bg-base-100 px-5 md:px-20">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">NarrativeNiche</a>
      </div>
      <div className="flex-none gap-2">
        <ThemeChanger />
        <MobileSearch data={data} />
        <Search data={data} />
        <PublishBlogButton/>
        <Profile/>
      </div>
    </div>
  );
};

export default Navbar;
