"use client"
import { useState } from "react";

// Define the type for each todo item
interface Todo {
  movie: string;
  id: number;
}

export default function Home() {
  
  // Define the state types for todos, inputValue, and id
  const [todos, setTodos] = useState<Todo[]>([{ movie: "Money Heist", id: 1 }, { movie: "Mission Impossible", id: 2 }]);
  const [inputValue, setInput] = useState<string>("");
  const [id, setId] = useState<number>(0);

  // Function to add or update an item
  const additems = () => {
    const obj = todos.find(item => item.id === id); // obj will be of type Todo | undefined

    if (obj) {
      // Filter out the existing item and add the new one
      const newArray = todos.filter(item => item.id !== obj.id);
      setTodos([...newArray, { movie: inputValue, id }]);
      setInput("");
      setId(0);
      return;
    }

    // Add a new item to the todos array
    setTodos([...todos, { movie: inputValue, id }]);
    setInput(""); // Clear input field
    setId(0); // Reset id
  };

  // Function to edit an item
  const editItems = (id: number) => {
    const obj = todos.find(item => item.id === id);
    if (obj) {
      setInput(obj.movie); // Set input field with the movie name
      setId(obj.id); // Set id to the item's id
    }
  };

  // Function to delete an item
  const delItems = (id: number) => {
    const newArray = todos.filter(item => item.id !== id);
    setTodos(newArray);
  };

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h1 className="text-center text-[40px] underline">Watch List</h1>

      {/* Input fields and buttons */}
      <div className="flex justify-between gap-4 mt-5">
        <input
          className="w-[60%] text-lg pl-2 ml-3 border-b focus:outline-none"
          type="text"
          value={inputValue}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write movie name"
        />
        <input
          className="w-[20%] text-lg pl-2 ml-3 border-b focus:outline-none"
          type="number"
          value={id}
          onChange={(e) => setId(Number(e.target.value))}  // Ensure `id` is a number
          placeholder="Write id"
        />
        <button onClick={additems} className="bg-blue-500 hover:bg-blue-300 w-[20%] text-white p-2 rounded">
          Search
        </button>
      </div>

      {/* Movies list heading */}
      <h1 className="text-center text-[40px] mt-5 underline">Watch Queue</h1>

      {/* Grid for movies */}
      <div className="grid grid-cols-2 gap-5 mt-5">
        {todos.map((item, i) => {
          return (
            <div className="shadow p-5" key={i}>
              <div className="flex justify-between">
                <span className="w-8 h-8 shadow rounded-full text-center my-auto">{i + 1}</span>
                <span
                  onClick={() => delItems(item.id)}
                  className="w-8 h-8 shadow rounded-full text-center my-auto cursor-pointer text-red-500"
                >
                  x
                </span>
              </div>
              <div className="text-gray-700 mt-5 text-[30px]">{item.movie}</div>
              <div>
                <h2 onClick={() => editItems(item.id)} className="text-right cursor-pointer">
                  Edit
                </h2>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
