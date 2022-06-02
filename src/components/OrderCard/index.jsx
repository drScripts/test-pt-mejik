import React from "react";
import { Link } from "react-router-dom";

export default function OrderCard({ cover, name, status, id }) {
  return (
    <div className={`flex items-start space-x-12 mt-8`}>
      <img
        src={
          cover ??
          "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1626716201l/57577167.jpg"
        }
        alt="book shown"
        className="shadow-2xl w-40 rounded-md h-60"
      />
      <div className="max-w-xs flex flex-col h-full justify-between">
        <div>
          <h3 className="capitalize font-medium text-2xl max-custom-w-2">
            {name}
          </h3>
          <h2
            className={`font-bold text-xl mt-3 ${
              status === "APPROVED" ? "text-green-500" : "text-yellow-400"
            }`}
          >
            {status}
          </h2>
        </div>
        <Link
          to={`/orders/${id}`}
          className="border-2 font-medium border-brownLight text-brownLight text-xl py-2 rounded-full hover:bg-brownLight hover:text-white text-center"
        >
          Detail
        </Link>
      </div>
    </div>
  );
}
