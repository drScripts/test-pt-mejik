import { useQuery } from "@apollo/client";
import { PencilAltIcon } from "@heroicons/react/solid";
import moment from "moment";
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CustomTable } from "../../components";
import { Base, Navbar } from "../../containers";
import { GETBORROWS } from "../../graphql/queries";

const tableTitles = [
  "User Name",
  "Book Name",
  "Start Date",
  "End Date",
  "Return Date",
  "Penalties",
  "Penalty Days",
  "Status",
  "Actions",
];

export default function BorrowsPage() {
  document.title = "Story Book Admin | Borrows";
  const [currentPage, setcurrentPage] = useState(1);
  const generateReadableDate = (dateString) => {
    return moment(new Date(dateString)).format("DD, MMM YYYY H:m");
  };

  const { data, loading } = useQuery(GETBORROWS, {
    variables: {
      orderBy: "createdAt_DESC",
      limit: 10000, // remove default limiting data (20 default) because i want to make a pagination if i use limit and skip i can't find the full length of data
    },
  });

  const currentDataTable = useMemo(() => {
    const maxData = 10;
    const pageCountFirst = (currentPage - 1) * maxData;
    const pageCountEnd = pageCountFirst + maxData;
    return data?.borrows?.slice(pageCountFirst, pageCountEnd);
  }, [currentPage, data]);

  const onPaginationClick = (page) => {
    setcurrentPage(page);
  };

  return (
    <Base isLoading={loading}>
      <Navbar />
      <div className="container mx-auto py-20">
        <h1 className="mb-10 font-bold text-4xl font-libre">Borrows List</h1>
        <CustomTable
          titles={tableTitles}
          onPaginationClick={onPaginationClick}
          currentPage={currentPage}
          totalPage={Math.ceil(data?.borrows?.length / 10)}
          withPagination
        >
          {currentDataTable?.map((borrow, i) => (
            <tr className="p-2" key={i}>
              <td className="border-b p-3 border-slate-600 text-left font-medium">
                {`${borrow?.user?.firstName} ${borrow?.user?.lastName}`}
              </td>
              <td className="border-b p-3 border-slate-600 text-left font-medium">
                {borrow?.book?.name}
              </td>
              <td className="border-b p-3 border-slate-600 text-left font-medium">
                {generateReadableDate(borrow?.dateStart)}
              </td>
              <td className="border-b p-3 border-slate-600 text-left font-medium">
                {generateReadableDate(borrow?.dueDate)}
              </td>
              <td className="border-b p-3 border-slate-600 text-left font-medium">
                {borrow?.returnDate
                  ? generateReadableDate(borrow?.returnDate)
                  : "-"}
              </td>
              <td className="border-b p-3 border-slate-600 text-left font-medium">
                {borrow?.pinaltyDays ? `${borrow?.pinaltyDays} Days` : "-"}
              </td>
              <td className="border-b p-3 border-slate-600 text-left font-medium">
                {borrow?.penalties ? `${borrow?.penalties}` : "-"}
              </td>
              <td className="border-b p-3 border-slate-600 text-left font-bold">
                <span
                  className={`${
                    borrow?.status === "ON_TIME"
                      ? "text-green-400"
                      : borrow?.status === "BORROWED"
                      ? "text-yellow-300"
                      : "text-red-600"
                  } `}
                >
                  {borrow?.status ?? "-"}
                </span>
              </td>
              <td className="border-b py-3 border-slate-600 text-left font-bold flex space-x-6">
                <Link to={`/admin/borrows/${borrow?.id}`}>
                  <div className={"bg-yellow-400 p-2 w-max rounded-xl"}>
                    <PencilAltIcon width={30} height={30} color={"#fff"} />
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
