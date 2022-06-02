import React from "react";
import BorrowCard from "../BorrowCard";
import RenderIf from "../RenderIf";

export default function HistoryBorrow({ data }) {
  return (
    <>
      <RenderIf condition={data?.length === 0}>
        <iframe
          src="https://embed.lottiefiles.com/animation/97434"
          width={400}
          height={400}
          title="animation no data"
          className="w-full mt-24"
        ></iframe>
      </RenderIf>
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
    </>
  );
}
