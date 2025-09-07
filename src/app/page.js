'use client'; // Required for client-side hooks like useRouter

import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  const goToRegister = () => {
    router.push('/register'); // Will navigate to /register
  };

  return (
   <div className="flex flex-col items-center justify-center min-h-screen">
  <h1 className="text-3xl font-bold mb-6">Welcome to My App</h1>
  <button
    onClick={goToRegister}
    className="px-6 py-2 text-white bg-blue-600 border border-blue-700 rounded hover:bg-blue-700 hover:border-blue-800 transition duration-300"
  >
    Go to Registration
  </button>
</div>

  );
}
