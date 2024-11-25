"use client"
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  
  const[todos, setTodos] = useState([{movie: "Money Hiest", id: 1}, {movie: "Mission Impossible", id: 2}]);

  //state banadi jismain input main jo aiga woo get kreingay or hold krein gay
  const[inputValue, setInput] = useState("");
  const[id, setId] = useState(0);

  //Function jb search button pay click hoga tw yeh function chalay ga
    const additems = () => {
    let obj:any = todos.find(item => item.id == id) //ismain id ko match kiya upper state wali id say 11 line pay.

    //agar object main kuch mila hai tw yeh iff statement chljai or ismain humnay new array banadi.
    if(obj){
      let newArray:any = todos.filter(item => item.id !== obj.id) 
      setTodos([...newArray,{movie: inputValue, id: id}])
      setInput("");
      setId(0);
      return
    }

    setTodos([...todos,{movie: inputValue, id: id}])
    setInput(""); //issay hamari input field khale hojaigi means hum jo search krkay button pay click krein gay tw new movie jb add krna jainge tw input field khale clear milay gee.
    setId(0); //same for id
  } 


  /*The purpose of this function is to find and display the item in your to-do list that matches
   the provided id (the one that was clicked to be edited).*/
      const editItems = (id:any) => {
      let obj:any = todos.find(item => item.id == id) //issay humnay dekha jo id hamary pass parameter main hain woo item kee id say match krrhe agar krrhe tw obj main save krdo or dikhado.
      setInput(obj.movie) //input field pay woo movie name ajaiga jo edit krna
      setId(obj.id) //same for id
  }

  const delItems = (id: any) => {
    let newArray:any = todos.filter(item => item.id !== id) 
      setTodos([...newArray])
  }


  return (
    <div className="max-w-4xl mx-auto p-5">
      <h1 className="text-center text-[40px] underline">Watch List</h1>

      {/* text for input and button */}
      <div className="flex justify-between gap-4 mt-5">
        <input className="w-[60%] text-lg pl-2 ml-3 border-b focus:outline-none"
         type="text"
         value={inputValue}
         onChange={(e) => setInput(e.target.value)}
         placeholder="write movies name" />

        <input className="w-[20%] text-lg pl-2 ml-3 border-b focus:outline-none"
         type="number"
         value={id}
         onChange={(e:any) => setId(e.target.value)}
         placeholder="write id" />

        <button onClick={additems} className="bg-blue-500 hover:bg-blue-300 w-[20%] text-white p-2 rounded">Search</button>
      </div>
      {/* end input part*/}

      {/*Movies list heading*/}
      <h1 className="text-center text-[40px] mt-5 underline">Watch Queue</h1>

      {/*Grid Items*/}
      <div className="grid grid-cols-2 gap-5 mt-5">
 
      {
        todos.map((item: any, i: any) => {
        return(
          <div className="shadow p-5" key={i}>

          <div className="flex justify-between">
            <span className="w-8 h-8 shadow rounded-full text-center my-auto">{i + 1}</span>
            <span onClick={() => delItems(item.id)} className="w-8 h-8 shadow rounded-full text-center my-auto cursor-pointer text-red-500">x</span>
          </div>

          {/*Added Data Names*/}
          <div className="text-gray-700 mt-5 text-[30px]">{item.movie}</div>

          {/*Added Edit button here*/}
          <div>
            <h2 onClick={() => editItems(item.id)} className="text-right cursor-pointer">Edit</h2>
            {/* <h4 className="text-green-600">id: {item.id}</h4> */}
          </div>
         

        </div>
            )
        })
      }
        
      </div>
    </div>
  );
}
