import React from "react";

import BookCard from "./bookCard";

const BookGrid = () => {

    return(
        <>
        <div className="flex justify-start flex-wrap gap-8">
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />

        </div>
      </>
    );


}

export default BookGrid