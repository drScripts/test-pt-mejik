import { useQuery } from "@apollo/client";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import moment from "moment";
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CustomTable } from "../components";
import { Base, Navbar } from "../containers";
import { GETORDERSQUERY } from "../graphql/queries";

const tableTitles = [
  "User Name",
  "Book Name",
  "Start Date",
  "End Date",
  "Status",
  "Actions",
];

export default function AdminOrdersPage() {
  const [currentPage, setcurrentPage] = useState(1);
  const generateReadableDate = (dateString) => {
    return moment(new Date(dateString)).format("DD, MMM YYYY H:m");
  };

  const { data, loading } = useQuery(GETORDERSQUERY, {
    variables: {
      orderBy: "createdAt_DESC",
    },
  });

  const currentDataTable = useMemo(() => {
    const maxData = 10;
    const pageCountFirst = (currentPage - 1) * maxData;
    const pageCountEnd = pageCountFirst + maxData;
    return data?.orders?.slice(pageCountFirst, pageCountEnd);
  }, [currentPage, data]);

  const onPaginationClick = (page) => {
    setcurrentPage(page);
  };

  return (
    <Base isLoading={loading}>
      <Navbar />
      <div className="container mx-auto py-20">
        <h1 className="mb-10 font-bold text-4xl font-libre">Orders List</h1>
        <CustomTable
          titles={tableTitles}
          onPaginationClick={onPaginationClick}
          currentPage={currentPage}
          totalPage={Math.ceil(data?.orders?.length / 10)}
          withPagination
        >
          {currentDataTable?.map((order, i) => (
            <tr className="p-2" key={i}>
              <td className="border-b p-3 border-slate-600 text-left font-medium">
                {`${order?.user?.firstName} ${order?.user?.lastName}`}
              </td>
              <td className="border-b p-3 border-slate-600 text-left font-medium">
                {order?.book?.name}
              </td>
              <td className="border-b p-3 border-slate-600 text-left font-medium">
                {generateReadableDate(order?.dateStart)}
              </td>
              <td className="border-b p-3 border-slate-600 text-left font-medium">
                {generateReadableDate(order?.dueDate)}
              </td>
              <td className="border-b p-3 border-slate-600 text-left font-bold">
                <span
                  className={`${
                    order?.status === "APPROVED"
                      ? "text-green-400"
                      : "text-yellow-300"
                  } `}
                >
                  {order?.status}
                </span>
              </td>
              <td className="border-b py-3 border-slate-600 text-left font-bold flex space-x-6">
                <Link to={"/"}>
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
