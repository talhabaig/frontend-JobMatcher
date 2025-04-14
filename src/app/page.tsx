"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

interface Job {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

export default function HomePage() {
  const [jobs, setJobs] = useState<Job[]>([]);

  // Fetch jobs on component mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/match/jobs`
        );
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <h1 className="text-5xl font-extrabold text-blue-800 mb-6">
        💼 AI Job Matcher
      </h1>
      <p className="text-lg text-gray-600 mb-10">
        Match candidates to jobs with AI precision.
      </p>

      <div className="flex flex-col md:flex-row gap-6 mb-10">
        <Link
          href="/job"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl shadow"
        >
          ➕ Post a Job
        </Link>
        <Link
          href="/candidate"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl shadow"
        >
          🧑‍💻 Add a Candidate
        </Link>
      </div>
      {jobs.length === 0 && (
        <p className="text-lg text-center text-gray-600">
          No jobs available at the moment.
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {jobs.length > 0 &&
          jobs.map((job) => (
            <div
              key={job.id}
              className="border border-gray-300 rounded-lg p-6 shadow-lg"
            >
              <h3 className="text-xl font-semibold text-blue-600 mb-4">
                {job.title}
              </h3>
              <p className="text-gray-600 mb-4">{job.description}</p>
              <p className="text-sm text-gray-500">
                Posted on: {new Date(job.createdAt).toLocaleDateString()}
              </p>
              <Link
                href={`/match/${job.id}`}
                className="text-blue-600 hover:text-blue-800 mt-4 inline-block"
              >
                View Match Candidates
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
