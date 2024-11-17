import React from "react";
import BookGrid from "./components/BookGrid";
import BookCard from "./components/bookCard";
import Search from "./components/search";

  function App() {
    return (
    <>
    <h1 className="m-5 font-bold font-poppins text-[1.5em] mb-5">WELCOME TO AZRIL BOOKS DATABASE</h1>

    <div className="w-fit h-auto border-2  m-5  px-7 py-5 space-y-5 rounded-lg">
      <div className="flex justify-start gap-10">
        <div className="flex flex-col w-auto h-auto font-poppins gap-3">
          <p className="font-bold">Lastest Book</p>
          <BookCard />

        </div>
        <div className="flex flex-col w-auto h-auto font-poppins gap-3">
          <p className="font-bold">Oldest Book Book</p>
          <BookCard />
        </div>
        <div className="ml-5 mt-3 font-poppins">
          <h2 className="font-bold mb-3">Database Information</h2>
          <p>Number of books : 10</p>
          <p>number of author : 7</p>
        </div>
      </div>

    </div>

    <div className="w-full h-auto px-8 py-5 space-y-5">
      <p className="font-bold text-[2em] font-poppins">ALL BOOKS</p>
      <div className="flex justify-start gap-5 font-poppins text-[0.9em]">
        <input type="text" placeholder="search by name" className="border-2 border-gray-500 px-3 py-1 rounded-md"/>
        <input type="text" placeholder="search by author" className="border-2 border-gray-500 px-3 py-1 rounded-md"/>
        <button className="bg-green-600 px-5 py-1 rounded-md font-bold text-white hover:bg-green-500">ADD BOOK</button>
      </div>
      <BookGrid />
    </div>
    </>
      
      
    );
  }

  export default App;
