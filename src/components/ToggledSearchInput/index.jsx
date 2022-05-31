import { SearchIcon } from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/solid";
import React, { useRef } from "react";

export default function ToggledSearchInput({ onChange }) {
  const widthRef = useRef(null);
  const inputRef = useRef(null);
  const closeRef = useRef(null);

  const onIconClick = () => {
    widthRef.current.style.width = "700px";
    widthRef.current.classList.add("shadow-lg", "bg-white");
    inputRef.current.style.display = "inline";
    closeRef.current.style.display = "inline";
  };

  const onClose = () => {
    widthRef.current.style.width = "46px";
    widthRef.current.classList.remove("shadow-lg", "bg-white");
    inputRef.current.style.display = "none";
    closeRef.current.style.display = "none";
  };

  return (
    <div
      ref={widthRef}
      className="transition ease-in-out py-2 px-2  rounded-full flex space-x-4"
      style={{ width: 46 }}
    >
      <SearchIcon width={30} height={30} onClick={onIconClick} />
      <input
        type="text"
        placeholder="Search book name or categories"
        ref={inputRef}
        style={{ display: "none" }}
        className={"w-full outline-none"}
        onChange={onChange}
      />
      <XIcon
        width={25}
        ref={closeRef}
        style={{ display: "none" }}
        onClick={onClose}
      />
    </div>
  );
}
