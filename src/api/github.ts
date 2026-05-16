// pages/api/github.ts or app/api/github/route.ts
export async function GET() {
  const res = await fetch('https://api.github.com/users/peerlynk', {
    headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
  });
  const data = await res.json();
  return Response.json(data);
}