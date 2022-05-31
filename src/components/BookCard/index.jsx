import React from "react";
import { Link } from "react-router-dom";
import Rating from "../Rating";

export default function BookCard({ className, name, authorName, id }) {
  const randomRatingValue = Math.floor(Math.random() * 5);

  return (
    <div className={`flex items-start space-x-12`}>
      <img
        src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1626716201l/57577167.jpg"
        alt="book shown"
        className="shadow-2xl w-40 rounded-md"
      />
      <div className="py-4 max-w-xs flex flex-col h-full justify-between">
        <div>
          <Rating size={25} total={5} value={randomRatingValue} />
          <h3 className="capitalize font-medium text-2xl mt-3 max-custom-w-2">
            {name}
          </h3>
          <p className="text-softLightBrown text-xl mb-4">{authorName}</p>
        </div>
        <Link
          to={`/book/${id}`}
          className="border-2 font-medium border-brownLight text-brownLight text-xl py-2 rounded-full hover:bg-brownLight hover:text-white text-center"
        >
          Detail
        </Link>
      </div>
    </div>
  );
}
