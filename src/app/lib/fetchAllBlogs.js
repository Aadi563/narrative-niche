export default async function allblogsDataFetch() {
    const response = await fetch(process.env.ROOT_URL+`/api/blogs/`, { cache: 'no-store' });
    const jsonData = await response.json();
    return jsonData;
  }
  