export default async function fetchABlog(title) {
    const response = await fetch(process.env.ROOT_URL+`/api/blogs/checkBlogExistWithTitle/${title}`, { cache: 'no-store' });
    const data = await response.json();
    return data;
  }
  