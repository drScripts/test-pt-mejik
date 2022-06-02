import React from "react";
import RenderIf from "../RenderIf";

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
  required = false,
}) {
  return (
    <div className={`flex flex-col ${className}`}>
      <label className="text-xl mb-1" htmlFor={id}>
        {label} {required ? "*" : "(optional)"}
      </label>
      <div className="border-2 border-gray-400 px-2 py-3 rounded-xl flex space-x-3">
        {icon}
        <RenderIf condition={/text|datetime-local|email|password/i.test(type)}>
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            id={id}
            className={"w-full outline-none text-lg bg-transparent"}
            required={required}
          />
        </RenderIf>
        <RenderIf condition={type === "area"}>
          <textarea
            name="description"
            placeholder={placeholder}
            id={id}
            className={"w-full outline-none text-lg bg-transparent"}
            onChange={onChange}
            required={required}
            value={value}
          />
        </RenderIf>
      </div>
    </div>
  );
}
