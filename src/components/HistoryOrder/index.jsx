import React from "react";
import OrderCard from "../OrderCard";
import RenderIf from "../RenderIf";

export default function HistoryOrder({ data }) {
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
          <OrderCard
            cover={val?.book?.cover}
            name={val?.book?.name}
            status={val?.status}
            key={val?.id}
            id={val?.id}
          />
        ))}
      </div>
    </>
  );
}
