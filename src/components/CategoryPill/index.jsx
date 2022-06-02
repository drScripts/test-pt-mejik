import { CheckIcon } from "@heroicons/react/solid";
import React from "react";

export default function CategoryPill({ selected, name, onClick }) {
  return (
    <button
      className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-full flex items-center space-x-2"
      onClick={() => onClick(name)}
    >
      <p>{name}</p> {selected && <CheckIcon width={20} height={20} />}
    </button>
  );
}
