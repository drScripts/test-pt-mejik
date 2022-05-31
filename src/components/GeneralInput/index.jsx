import React from "react";

export default function GeneralInput({
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  icon,
  className,
}) {
  return (
    <div className={`flex flex-col ${className}`}>
      <label className="text-xl mb-1" htmlFor={id}>
        {label}
      </label>
      <div className="border-2 border-gray-400 px-2 py-3 rounded-xl flex space-x-3">
        {icon}
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          id={id}
          className={"w-full outline-none text-lg"}
        />
      </div>
    </div>
  );
}
