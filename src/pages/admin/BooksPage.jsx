import { useQuery } from "@apollo/client";
import React, { useMemo, useState } from "react";
import { CustomTable } from "../../components";
import { Base, Navbar } from "../../containers";
import { LISTBOOKQUERY } from "../../graphql/queries";
import { Link } from "react-router-dom";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";
import { PlusIcon } from "@heroicons/react/solid";

const tableTitles = [
  "Book Name",
  "Book Code",
  "Rack",
  "Author Name",
  "Category",
  "Status",
  "Actions",
];

export default function BooksPage() {
  const limitData = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const { data, loading } = useQuery(LISTBOOKQUERY);

  const booksDataTable = useMemo(() => {
    const pageFirst = (currentPage - 1) * limitData;
    const pageEnd = pageFirst + limitData;
    return data?.books?.slice(pageFirst, pageEnd);
  }, [currentPage, data]);

  const paginationCllickHandler = (page) => {
    setCurrentPage(page);
  };

  return (
    <Base isLoading={loading}>
      <Navbar />
      <div className="container mx-auto py-20">
        <div className="flex justify-between items-center mb-10">
          <h1 className="font-bold text-4xl font-libre">Books List</h1>
          <Link
            to={"/admin/books/add"}
            className="w-14 h-14 bg-blue-400 rounded-lg flex items-center justify-center"
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
                <Link to={`/admin/books/${book?.id}`}>
                  <div className={"bg-yellow-400 p-2 w-max rounded-xl"}>
                    <PencilAltIcon width={30} height={30} color={"#fff"} />
                  </div>
                </Link>
                <Link to={"/"}>
                  <div className={"bg-red-600 p-2 w-max rounded-xl"}>
                    <TrashIcon width={30} height={30} color={"#fff"} />
                  </div>
                </Link>
              </td>
            </tr>
          ))}
        </CustomTable>
      </div>
    </Base>
  );
}
