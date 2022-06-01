import { Listbox } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import React from "react";

export default function SelectOption({
  value,
  onChange,
  data,
  name,
  placeholder,
  label,
  className,
}) {
  return (
    <div className={`${className} relative`}>
      <Listbox value={value} onChange={onChange} name={name}>
        <Listbox.Label className={"text-xl"}>{label}</Listbox.Label>
        <Listbox.Button
          className={
            "w-full outline-none text-lg text-left border-2 border-gray-400 px-2 py-3 rounded-xl flex justify-between items-center"
          }
          placeholder={placeholder}
        >
          <p>{value?.name}</p>
          <ChevronDownIcon width={30} height={30} />
        </Listbox.Button>
        <Listbox.Options
          className={
            "bg-white mt-2 rounded-md max-h-48 overflow-scroll absolute w-full z-50"
          }
        >
          {data?.map((value) => (
            <Listbox.Option
              key={value.id}
              value={value}
              disabled={value.unavailable}
              className={"hover:bg-slate-300 px-3 py-2"}
            >
              {value.name}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
}
