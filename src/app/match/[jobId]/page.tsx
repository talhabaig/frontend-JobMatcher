'use client';
import { use } from 'react';
import MatchResults from '@/components/MatchResults';

export default function MatchPage({ params }: { params: Promise<{ jobId: string }> }) {
  const { jobId } = use(params);

  return (
    <div className="bg-white p-8 rounded-2xl shadow">
      <h2 className="text-3xl font-bold text-blue-800 mb-4">📊 Match Results</h2>
      <MatchResults jobId={jobId} />
    </div>
  );
}
