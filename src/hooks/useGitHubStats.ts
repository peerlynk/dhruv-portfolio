// src/hooks/useGitHubStats.ts
import { useState, useEffect } from 'react';

export function useGitHubStats(username: string) {
  const [stats, setStats] = useState({
    contributions: 0,
    repoCount: 0,
    totalStars: 0,
    loading: true,
    error: null as string | null,
  });

  useEffect(() => {
    const fetchAll = async () => {
      setStats(prev => ({ ...prev, loading: true, error: null }));
      try {
        // REST: user + repos
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        if (!userRes.ok) throw new Error(`User API error: ${userRes.status}`);
        const userData = await userRes.json();

        const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        const repos = await reposRes.json();
        const totalStars = repos.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0);

        // GraphQL: contributions (needs token)
        const graphqlQuery = {
          query: `query($userName:String!) {
            user(login: $userName) {
              contributionsCollection {
                contributionCalendar { totalContributions }
              }
            }
          }`,
          variables: { userName: username }
        };
        const graphqlRes = await fetch('https://api.github.com/graphql', {
          method: 'POST',
          headers: {
            'Authorization': `bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(graphqlQuery)
        });
        if (!graphqlRes.ok) throw new Error(`GraphQL error: ${graphqlRes.status}`);
        const graphqlData = await graphqlRes.json();
        const totalContributions = graphqlData?.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions || 0;

        setStats({
          contributions: totalContributions,
          repoCount: userData.public_repos,
          totalStars,
          loading: false,
          error: null,
        });
      } catch (err: any) {
        console.error("GitHub fetch error:", err);
        setStats(prev => ({ ...prev, loading: false, error: err.message }));
      }
    };
    if (username) fetchAll();
  }, [username]);

  return stats;
}