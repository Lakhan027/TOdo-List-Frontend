'use client';

import { useState } from "react";
import Link from 'next/link';

export default function RegisterPage() {
   const [name,setNmae]=useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [message, setMessage] = useState('');

   const API_URL=process.env.NEXT_PUBLIC_API_URL;
   
   async function handleRegister(e) {   
      e.preventDefault();

      try{

        const res=await fetch(`${API_URL}/register`,{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({name,email,password})
        });

        const data=await res.json();

        if(res.ok){
            setMessage('✅ User registered successfully!');
            setNmae('');
            setEmail('');
            setPassword('');
        }else{
          setMessage('❌ User registered not successfully!');
        }

      }catch(err){    
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e)=>{setNmae(e.target.value)}}
              value={name}
              required  
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Email:</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
               onChange={(e)=>{setEmail(e.target.value)}}
              value={email}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password:</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
               onChange={(e)=>{setPassword(e.target.value)}}
              value={password}
              required 
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Register
          </button>
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
