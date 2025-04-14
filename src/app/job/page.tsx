'use client';
import JobForm from '@/components/JobForm';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function JobPage() {
  const [jobId, setJobId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (jobId) {
      const timer = setTimeout(() => {
        router.push('/');
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [jobId, router]);

  return (
    <div className="bg-white p-8 rounded-2xl shadow">
      {!jobId ? (
        <>
          <h2 className="text-3xl font-bold text-blue-800 mb-4">📝 Submit a Job</h2>
          <JobForm onJobSubmit={(job) => setJobId(job.id)} />
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl text-green-600 font-semibold">Job Submitted!</h2>
          <p className="text-gray-700 mt-2">
            Redirecting to <a href={`/match/${jobId}`} className="text-blue-500 underline">matching candidates</a>...
          </p>
        </div>
      )}
    </div>
  );
}
