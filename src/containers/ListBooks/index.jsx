import React, { useEffect } from "react";
import { BookCard, CategoryPill, ToggledSearchInput } from "../../components";
import { useQuery } from "@apollo/client";
import { useSearchParams } from "react-router-dom";
import { GETCATEGORIES, LISTBOOKQUERY } from "../../graphql/queries";

export default function ListBooks({ refs }) {
  let [searchParams, setSearchParams] = useSearchParams();

  const searchInputHanlder = (e) => {
    setSearchParams({
      q: e.target.value,
      category: searchParams.get("category") ?? "",
    });
  };

  const { data: categoriesData } = useQuery(GETCATEGORIES);

  const { data, refetch } = useQuery(LISTBOOKQUERY, {
    variables: {
      where: searchParams.get("category")
        ? {
            category: {
              name: searchParams.get("category"),
            },
          }
        : {},
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
    },
  });

  const onCategoryClick = (name) => {
    if (searchParams.get("category") === name) {
      setSearchParams({
        category: "",
        q: searchParams.get("q"),
      });
    } else {
      setSearchParams({
        category: name,
        q: searchParams.get("q"),
      });
    }
  };

  useEffect(() => {
    refetch();
  }, [searchParams, refetch]);

  return (
    <section className="py-12">
      <div className="container mx-auto">
        <div className="flex items-center space-x-8">
          <h2 className="text-3xl font-libre font-medium" ref={refs}>
            All Available Books
          </h2>
          <ToggledSearchInput onChange={searchInputHanlder} />
        </div>
        <div className="mt-10 flex w-full overflow-x-scroll gap-3">
          {categoriesData?.categories?.map((category) => (
            <CategoryPill
              name={category?.name}
              selected={searchParams.get("category") === category?.name}
              key={category?.id}
              onClick={onCategoryClick}
            />
          ))}
        </div>
        <div className="grid grid-cols-3 space-y-5 py-12">
          {data?.books?.map((book) => (
            <BookCard
              name={book?.name}
              key={book.id}
              authorName={book?.author?.name}
              id={book?.id}
              cover={book?.cover}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
