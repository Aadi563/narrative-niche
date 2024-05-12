export default async function allblogsDataFetch() {
    const response = await fetch(`http://localhost:3000/api/blogs/`, { cache: 'no-store' });
    const data = await response.json();
    return data;
  }
  