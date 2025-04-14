'use client';
import Link from 'next/link';

const Navbar = () => (
  <nav className="bg-white shadow-md p-4 sticky top-0 z-10">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-blue-700">JobMatcher</Link>
      <div className="flex gap-6">
        <Link href="/job" className="hover:text-blue-500">Post Job</Link>
        <Link href="/candidate" className="hover:text-blue-500">Add Candidate</Link>
      </div>
    </div>
  </nav>
);

export default Navbar;
