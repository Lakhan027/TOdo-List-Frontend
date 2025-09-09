'use client';

import { useState } from "react";
import Link from 'next/link';
import LoaderButton from "../components/LoaderButton/page";
import { useRouter } from "next/navigation";

export default function RegisterPage() {


   const router = useRouter();

   const [name, setNmae] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

   const API_URL = process.env.NEXT_PUBLIC_API_URL;
   
   async function handleRegister(e) {   
      e.preventDefault();
        setLoading(true);

      try {
        const res = await fetch(`${API_URL}/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email, password })
        });

        const data = await res.json();

        if (res.ok) {
          alert('✅ User registered successfully!');
          router.push('/login');
          setNmae('');
          setEmail('');
          setPassword('');
           setLoading(false);
        } else {
          alert(data.error || '❌ User registration failed!');
        }
      } catch (err) {    
        setMessage('❌ Error: ' + err.message);
      }
   }
   
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Register</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Name:</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
              onChange={(e) => setNmae(e.target.value)}
              value={name}
              required  
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Email:</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password:</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required 
            />
          </div>

          <LoaderButton loading={loading}>Register</LoaderButton>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-700">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 hover:underline">
              Login here
            </Link>
          </p>
        </div>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
}
