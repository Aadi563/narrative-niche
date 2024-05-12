export default async function fetchBlogDetails(blogId) {
  const response = await fetch(`http://localhost:3000/api/blogs/${blogId}`, { cache: 'no-store' });
  const data = await response.json();
  return data;
}
