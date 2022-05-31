import React from "react";
import { SearchIcon } from "@heroicons/react/outline";

export default function SearchInput({ className }) {
  return (
    <div className={className}>
      <div className="flex bg-white px-4 py-4 rounded-full space-x-7 shadow-md">
        <SearchIcon width={30} height={30} color={"#a19b8f"} />
        <input
          type="text"
          placeholder="Titles, author, or topics"
          className="w-full placeholder:text-softLightBrown placeholder:text-xl text-xl outline-none"
        />
      </div>
    </div>
  );
}
