import React from "react";
import editLogo from '../assets/edit.png'
import deleteLogo from '../assets/delete.png'

const BookCard = () => {

    return(
        <div className="relative w-[300px] h-[150px] border-2 border-[#000000b2] rounded-md px-4 py-2 font-poppins hover:bg-gray-500/20">
            <p className="font-bold text-[1.2em] mb-3">To Kill a Mockingbird</p>
            <p className="font-extralight">Harper Lee</p>
            <p className="font-extralight">1960-07-11</p>
            <div className="absolute flex justify-end  bottom-4 right-3 gap-3">
                <button><img src={editLogo} alt="edit" className="w-8 hover:scale-125 transition-transform duration-200 rounded-md" /></button>
                <button><img src={deleteLogo} alt="delete" className="w-8 hover:scale-125 transition-transform duration-200 rounded-md"/></button>
            </div>

        </div>


        
    );

}

export default BookCard