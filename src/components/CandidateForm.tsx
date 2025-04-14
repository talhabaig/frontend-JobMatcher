'use client'
import { useState } from "react";
import axios from "axios";

interface Candidate {
  id: string;
  name: string;
  bio: string;
}

const CandidateForm = ({ onCandidateSubmit }: { onCandidateSubmit: (candidate: Candidate) => void }) => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const candidateData: Candidate = {
      id: `cand_${Date.now()}`,
      name,
      bio
    };

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/candidates`, candidateData);
      onCandidateSubmit(candidateData);
      setName("");
      setBio("");
    } catch (error) {
      console.error("Error creating candidate:", error);
      setError("Failed to submit candidate. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-2xl shadow-md p-6 md:p-8">
      {error && <p className="text-red-500">{error}</p>}

      <div className="flex flex-col space-y-2">
        <label htmlFor="name" className="text-lg font-medium text-gray-700">Candidate Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter candidate name"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="bio" className="text-lg font-medium text-gray-700">Candidate Bio</label>
        <textarea
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          required
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write a short bio"
          rows={4}
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-6 text-white font-semibold rounded-lg transition duration-200 ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Submitting...' : 'Submit Candidate'}
        </button>
      </div>
    </form>
  );
};

export default CandidateForm;
