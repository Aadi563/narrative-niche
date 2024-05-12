export default async function limitedBlogsDataFetch(offset, limit) {
  const response = await fetch(`http://localhost:3000/api/blogs/limit/${offset}-${limit}`, { cache: 'no-store' });
  const data = await response.json();
  return data;
}
