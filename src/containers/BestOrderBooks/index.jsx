import { useQuery } from "@apollo/client";
import React from "react";
import { BookCard } from "../../components";
import { LISTBOOKQUERY } from "../../graphql/queries";

export default function BestOrderBookx() {
  const { data } = useQuery(LISTBOOKQUERY, {
    variables: {
      limit: 4,
      or: [
        {
          status: "BORROWED",
        },
      ],
    },
  });

  return (
    <div className="flex overflow-x-scroll overflow-y-hidden py-14 space-x-52">
      {data?.books?.map((book) => (
        <BookCard
          id={book?.id}
          authorName={book?.author?.name}
          cover={book?.cover}
          name={book?.name}
          key={book?.id}
        />
      ))}
    </div>
  );
}
