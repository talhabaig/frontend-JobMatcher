'use client';
import { useState } from 'react';
import axios from 'axios';

const JobForm = ({ onJobSubmit }: { onJobSubmit: (job: any) => void }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const jobData = {
      id: `job_${Date.now()}`, // unique job ID (could be improved)
      title,
      description,
    };

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/jobs`, jobData);
      onJobSubmit(jobData);
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error creating job:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col space-y-2">
        <label htmlFor="title" className="text-lg font-medium text-gray-700">Job Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter the job title"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="description" className="text-lg font-medium text-gray-700">Job Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Provide a brief description of the job"
        />
      </div>

      <div>
        <button
          type="submit"
          className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Submit Job
        </button>
      </div>
    </form>
  );
};

export default JobForm;
