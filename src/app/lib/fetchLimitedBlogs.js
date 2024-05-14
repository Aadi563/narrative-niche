export default async function limitedBlogsDataFetch(offset, limit) {
  const response = await fetch(process.env.ROOT_URL+`/api/blogs/limit/${offset}-${limit}`, { cache: 'no-store' });
  const data = await response.json();
  return data;
}
