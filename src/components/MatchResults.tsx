'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface MatchResult {
  candidateId: string;
  matchScore: number;
}

const MatchResults = ({ jobId }: { jobId: string }) => {
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/match`, { jobId });
        setMatches(res.data);
      } catch (err) {
        console.error('Error fetching matches:', err);
        setError('Failed to fetch matches.');
      } finally {
        setLoading(false);
      }
    };

    if (jobId) {
      fetchMatches();
    }
  }, [jobId]);

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Top Matches</h2>

      {loading && <p>Loading matches...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && matches.length === 0 && <p>No matches found.</p>}

      <ul className="space-y-2">
        {matches.map((match) => (
          <li key={match.candidateId} className="border p-2 rounded">
            <strong>{match.candidateId}</strong> – Score: {match.matchScore.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MatchResults;
