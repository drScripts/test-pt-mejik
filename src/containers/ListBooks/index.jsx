import React, { useEffect } from "react";
import { BookCard, ToggledSearchInput } from "../../components";
import { gql, useQuery } from "@apollo/client";
import { useSearchParams } from "react-router-dom";

const LISTQUERY = gql`
  query listBook($or: [BookFilter], $where: BookFilter) {
    books(or: $or, where: $where) {
      name
      cover
      description
      code
      status
      rack {
        name
        code
        id
      }
      author {
        name
        photo
        id
      }
      category {
        name
        code
        id
      }
      id
    }
  }
`;

export default function ListBooks() {
  let [searchParams, setSearchParams] = useSearchParams();

  const searchInputHanlder = (e) => {
    setSearchParams({ q: e.target.value });
  };

  const { data, refetch } = useQuery(LISTQUERY, {
    variables: searchParams.get("q")
      ? {
          or: [
            {
              name_contains: searchParams.get("q"),
            },
            {
              category: {
                name_contains: searchParams.get("q"),
              },
            },
          ],
        }
      : {},
  });

  useEffect(() => {
    return () => {
      setSearchParams({});
    };
  }, [setSearchParams]);

  useEffect(() => {
    refetch();
  }, [searchParams, refetch]);

  return (
    <section className="py-12">
      <div className="container mx-auto">
        <div className="flex items-center space-x-8">
          <h2 className="text-3xl font-libre font-medium">
            All Available Books
          </h2>
          <ToggledSearchInput onChange={searchInputHanlder} />
        </div>
        <div className="grid grid-cols-3 space-y-5 py-12">
          {data?.books?.map((book) => (
            <BookCard
              name={book?.name}
              key={book.id}
              authorName={book?.author?.name}
              id={book?.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
