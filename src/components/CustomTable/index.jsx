import { RefreshIcon } from "@heroicons/react/outline";
import React from "react";
import RenderIf from "../RenderIf";
import ToggledSearchInput from "../ToggledSearchInput";

export function Pagination({ totalPage = 10, currentPage = 1, onClick }) {
  return (
    <div className="flex justify-end px-10">
      {Array.from({ length: totalPage }).map((v, i) => (
        <p
          className={`${
            i + 1 === currentPage ? "bg-slate-300" : ""
          } rounded-full w-10 h-10 flex items-center justify-center font-medium cursor-pointer`}
          key={i}
          onClick={() => {
            onClick(i + 1);
          }}
        >
          {i + 1}
        </p>
      ))}
    </div>
  );
}

export default function CustomTable({
  titles,
  children,
  onPaginationClick,
  totalPage,
  currentPage,
  withPagination = false,
  loading = false,
  onRefetchClick,
  onSearchChange,
  showRefetch = false,
  showSearch = false,
}) {
  return (
    <div className="bg-white px-4 py-4 rounded-xl shadow-lg">
      <div className="flex justify-end items-center mb-4 space-x-6">
        <RenderIf condition={showSearch}>
          <ToggledSearchInput maxWidth="500px" onChange={onSearchChange} />
        </RenderIf>
        <RenderIf condition={showRefetch}>
          <button
            className={`p-2 hover:shadow-xl transition-all rounded-full  ${
              loading ? "spin-animate" : ""
            }`}
            onClick={onRefetchClick}
          >
            <RefreshIcon width={30} height={30} />
          </button>
        </RenderIf>
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr className="p-2">
            {titles.map((title, i) => (
              <th className="border-b p-3 border-slate-600 text-left" key={i}>
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
      <RenderIf condition={withPagination}>
        <div className="mt-5 py-4 text-right">
          <Pagination
            onClick={onPaginationClick}
            currentPage={currentPage}
            totalPage={totalPage}
          />
        </div>
      </RenderIf>
    </div>
  );
}
