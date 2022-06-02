import React from "react";
import BorrowCard from "../BorrowCard";

export default function HistoryBorrow({ data }) {
  return (
    <div className="grid grid-cols-2">
      {data?.map((val) => (
        <BorrowCard
          cover={val?.book?.cover}
          name={val?.book?.name}
          status={val?.status}
          id={val?.id}
        />
      ))}
    </div>
  );
}
