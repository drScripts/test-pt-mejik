import React from "react";
import OrderCard from "../OrderCard";

export default function HistoryOrder({ data }) {
  return (
    <div className="grid grid-cols-2">
      {data?.map((val) => (
        <OrderCard
          cover={val?.book?.cover}
          name={val?.book?.name}
          status={val?.status}
          key={val?.id}
          id={val?.id}
        />
      ))}
    </div>
  );
}
