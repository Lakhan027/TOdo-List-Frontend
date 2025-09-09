'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoaderButton from '../components/LoaderButton/page';



 const API_URL=process.env.NEXT_PUBLIC_API_URL;


export default function LoginPage(){
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
     const router = useRouter();
     const [loading, setLoading] = useState(false);
    
    async function handleLogin(e){
        e.preventDefault();
        setLoading(true);

        const res=await fetch(`${API_URL}/login`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body:JSON.stringify({email,password})
        });

        const data=await res.json();
        if(res.ok){
          alert('✅ User Login successfully!');
          router.push('/todo');
          setEmail('');
          setPassword('');
          setLoading(false);
        }else{
            alert(data.error ||'❌ Login failed.')
        }
    }
    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Log In</h2>
        <form onSubmit={handleLogin} className="space-y-4">

          <div>
            <label className="block text-gray-700 mb-1">Email:</label>
            <input
  type="email"
  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
  onChange={(e) => setEmail(e.target.value)}
  value={email}
  required
/>

          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password:</label>
           <input
  type="password"
  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
  onChange={(e) => setPassword(e.target.value)}
  value={password}
  required
/>

          </div>

          <LoaderButton loading={loading}>Log In</LoaderButton>

        </form>

         <div className="text-center mt-4">
        <p className="text-sm text-gray-700">
          Don’t have an account?{' '}
          <Link href="/register" className="text-blue-600 hover:underline">
            register here
          </Link>
        </p>
      </div>

        
      </div>
    </div>
  );
}