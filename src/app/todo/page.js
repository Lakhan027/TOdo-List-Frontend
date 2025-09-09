'use client'

import { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import LoaderButton from '../components/LoaderButton/page';


 const API_URL=process.env.NEXT_PUBLIC_API_URL;


export default function Home() {
  const [title, setTitle] = useState('');
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);
   
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

    

 
  // console.log(todos);


  useEffect(() => {
    const handleGetTodo = async () => {
      try {
        const res = await fetch(`${API_URL}/todos`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'  // 👈 Important: Send cookies like sessionId
        });

        if (!res.ok) {
          throw new Error('Failed to fetch todos');
        }

        const data = await res.json();
        setTodos(data);
      } catch (error) {
        console.error('Error get todos:', error);
      }
    };

    handleGetTodo();
  }, [refresh]);


  const handleAddTodo = async () => {
      setLoading(true);

    try {
      const res = await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ title, task })
      })
      const data = await res.json();
      if (res.ok) {
        alert('Todo Data Added successfully!');
        setTitle('');
        setTask('');
        setTodos((prevTodos) => [...prevTodos, data]);
        setRefresh(prev => !prev)
      } else {
        alert('❌ Todo Data not Added successfully!');
      }
        setLoading(false);


    } catch (error) {
      console.error('Error add todos:', error);
    }
  };

  const handleLogout = async () => {

    try {
      const res = await fetch(`${API_URL}/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      console.log("ssss");
      const data = await res.json(); // ✅ You missed `await` here

      if (res.ok) {
        alert('✅ User LogOut successfully!');


        router.push('/login'); //Make sure `router` is defined (e.g., from `useRouter` in Next.js)
        console.log('Logout successful:', data.message);
      } else {
        console.error('Logout failed:', data.error);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };



  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/todos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      })

      if (res.ok) {
        alert('✅ Todo deleted successfully!');
        setTodos(todos.filter((todo) => todo.id !== id));
        setRefresh(prev => !prev)
      } else {
        console.error('❌ Failed to delete todo:', await res.text());
      }

    } catch (error) {
      console.error('Error Delete Todos:', error);
    }
  }


   const STATUS_OPTIONS = ['PENDING', 'IN_PROGRESS', 'COMPLETED'];


  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`${API_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setRefresh(prev => !prev);
      } else {
        console.error('Failed to update status');
      }
    } catch (error) {
      console.error('Error Update Todos:', error);
    }
  };

  return (
    <>
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
        <h2 className="text-2xl font-bold text-indigo-700">My Todo App</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition"
        >
          🚪 Logout
        </button>
      </header>

      <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-white py-10 px-4">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-xl border">
          <h1 className="text-4xl font-extrabold text-indigo-700 mb-6 text-center">📝 My Todo List</h1>

         <div className="grid md:grid-cols-2 gap-4 mb-4">
  <input
    type="text"
    placeholder="Enter title (e.g. Grocery)"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    className="p-3 border border-gray-300 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400"
  />
  <input
    type="text"
    placeholder="Enter task (e.g. Buy groceries)"
    value={task}
    onChange={(e) => setTask(e.target.value)}
    className="p-3 border border-gray-300 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400"
  />
</div>


         <LoaderButton loading={loading} onClick={handleAddTodo}>
  ➕ Add Todo
</LoaderButton>



          <div className="mt-8">
            {!Array.isArray(todos) ? (
              <p className="text-red-500 text-center mt-6">Error loading todos.</p>
            ) : todos.length === 0 ? (
              <p className="text-gray-400 text-center mt-6">No todos added yet.</p>
            ) : (
              <ul className="space-y-4">
                {todos.map((todo, index) => (
                  <li
                    key={index} 
                    className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full sm:gap-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6">
                        <div className="font-bold text-indigo-700 text-lg">{todo.title}</div>
                        <div className="text-gray-700 text-sm sm:text-base">{todo.task}</div>
                      </div>

                      <div className="flex items-center gap-3 mt-3 sm:mt-0">

                        <select
                          value={todo.status}
                          onChange={(e) => handleStatusChange(todo.id, e.target.value)}
                          className="text-xs font-semibold px-3 py-1 rounded-full"
                        >
                          {STATUS_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                              {option.replace('_', ' ')}
                            </option>
                          ))}
                        </select>

                        <button
                          onClick={() => handleDelete(todo.id)}
                          className="text-red-500 hover:text-red-700 transition"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>


        </div>
      </main>
    </>
  );
}

