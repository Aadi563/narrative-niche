export default async function fetchBlogDetails(blogId) {
  const response = await fetch(process.env.ROOT_URL+`/api/blogs/${blogId}`, { cache: 'no-store' });
  const data = await response.json();
  return data;
}
