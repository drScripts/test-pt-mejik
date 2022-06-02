import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useMemo, useState } from "react";
import { CustomTable } from "../../components";
import { Base, Navbar } from "../../containers";
import { LISTBOOKQUERY } from "../../graphql/queries";
import { Link, useSearchParams } from "react-router-dom";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";
import { PlusIcon } from "@heroicons/react/solid";
import { DELETEBOOKMUTATE } from "../../graphql/mutations";
import { toast } from "react-toastify";

export default function BooksPage() {
  const limitData = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, loading, refetch } = useQuery(LISTBOOKQUERY, {
    variables: {
      limit: 100000,
    },
  });
  const [deleteBook, { loading: loadingDelete }] = useMutation(
    DELETEBOOKMUTATE,
    {
      onError: (error) => {
        toast.error(error.message);
      },
      onCompleted: () => {
        toast.success("Successfully delete book!");
        refetch();
      },
    }
  );
  const tableTitles = [
    "Book Name",
    "Book Code",
    "Rack",
    "Author Name",
    "Category",
    "Status",
    "Actions",
  ];

  const booksDataTable = useMemo(() => {
    const pageFirst = (currentPage - 1) * limitData;
    const pageEnd = pageFirst + limitData;
    return data?.books?.slice(pageFirst, pageEnd);
  }, [currentPage, data]);

  const paginationCllickHandler = (page) => {
    setCurrentPage(page);
  };

  const onSearchChange = (e) => {
    setSearchParams({ q: e.target.value });
  };

  useEffect(() => {
    const query = searchParams.get("q");
    refetch({
      or: [
        {
          name_contains: query,
        },
        {
          category: {
            name_contains: query,
          },
        },
      ],
    });
  }, [refetch, searchParams]);

  return (
    <Base isLoading={loading || loadingDelete}>
      <Navbar />
      <div className="container mx-auto py-20">
        <div className="flex justify-between items-center mb-10">
          <h1 className="font-bold text-4xl font-libre">Books List</h1>
          <Link
            to={"/admin/books/add"}
            className={`w-14 h-14 bg-blue-400 rounded-lg flex items-center justify-center`}
          >
            <PlusIcon width={30} height={30} color={"#fff"} />
          </Link>
        </div>
        <CustomTable
          titles={tableTitles}
          currentPage={currentPage}
          totalPage={Math.ceil(data?.books?.length / limitData)}
          onPaginationClick={paginationCllickHandler}
          withPagination
          loading={loading}
          onRefetchClick={() => {
            refetch();
          }}
          showRefetch
          showSearch
          onSearchChange={onSearchChange}
        >
          {booksDataTable?.map((book, i) => (
            <tr className="p-2" key={i}>
              <td className="border-b p-3 border-slate-600 text-left font-medium">
                {book?.name}
              </td>
              <td className="border-b p-3 border-slate-600 text-left font-medium">
                {book?.code}
              </td>
              <td className="border-b p-3 border-slate-600 text-left font-medium">
                {book?.rack?.name}
              </td>
              <td className="border-b p-3 border-slate-600 text-left font-medium">
                {book?.author?.name}
              </td>
              <td className="border-b p-3 border-slate-600 text-left font-medium">
                {book?.category?.name}
              </td>
              <td className="border-b p-3 border-slate-600 text-left font-bold">
                <span
                  className={`${
                    book?.status === "AVAILABLE"
                      ? "text-green-400"
                      : "text-yellow-300"
                  } `}
                >
                  {book?.status}
                </span>
              </td>
              <td className="border-b py-3 border-slate-600 text-left font-bold flex space-x-6">
                <Link
                  to={`/admin/books/${book?.id}`}
                  className={"cursor-pointer"}
                >
                  <div className={"bg-yellow-400 p-2 w-max rounded-xl"}>
                    <PencilAltIcon width={30} height={30} color={"#fff"} />
                  </div>
                </Link>

                <button
                  className={"bg-red-600 p-2 w-max rounded-xl cursor-pointer"}
                  onClick={() =>
                    deleteBook({
                      variables: {
                        id: book?.id,
                      },
                    })
                  }
                >
                  <TrashIcon width={30} height={30} color={"#fff"} />
                </button>
              </td>
            </tr>
          ))}
        </CustomTable>
      </div>
    </Base>
  );
}
