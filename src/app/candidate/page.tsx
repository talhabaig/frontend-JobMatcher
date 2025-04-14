'use client';
import CandidateForm from '@/components/CandidateForm';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CandidatePage() {
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        router.push('/');
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [submitted, router]);

  return (
    <div className="bg-white p-8 rounded-2xl shadow">
      {!submitted ? (
        <>
          <h2 className="text-3xl font-bold text-blue-800 mb-4">🧑‍💻 Add Candidate</h2>
          <CandidateForm onCandidateSubmit={() => setSubmitted(true)} />
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl text-green-600 font-semibold">Candidate Added!</h2>
          <p className="text-gray-700 mt-2">Redirecting to candidates list...</p>
        </div>
      )}
    </div>
  );
}
