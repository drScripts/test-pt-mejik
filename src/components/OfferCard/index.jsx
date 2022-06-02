import React from "react";

export default function OfferCard({ src, title, description }) {
  return (
    <div className="hover:bg-white hover:rounded-2xl hover:shadow-xl transition-all ease-in-out duration-500 p-4 max-w-sm flex items-center flex-col">
      <img src={src} alt="Book Icon" width={200} />
      <h1 className="font-libre text-2xl font-bold my-4">{title}</h1>
      <p className="text-center font-libre font-medium text-lg text-gray-400">
        {description}
      </p>
    </div>
  );
}
