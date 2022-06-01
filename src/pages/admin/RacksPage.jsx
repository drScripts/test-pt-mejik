import { useQuery } from "@apollo/client";
import React, { useMemo, useState } from "react";
import { CustomTable } from "../../components";
import { Base, Navbar } from "../../containers";
import { GETRACKS } from "../../graphql/queries";
import { Link } from "react-router-dom";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";
import { PlusIcon } from "@heroicons/react/solid";

export default function RacksPage() {
  const limitData = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const { data, loading } = useQuery(GETRACKS);
  const tableTitles = ["Rack Name", "Rack Code", "Actions"];

  const racksDataTable = useMemo(() => {
    const pageFirst = (currentPage - 1) * limitData;
    const pageEnd = pageFirst + limitData;
    return data?.racks?.slice(pageFirst, pageEnd);
  }, [currentPage, data]);

  const paginationCllickHandler = (page) => {
    setCurrentPage(page);
  };

  return (
    <Base isLoading={loading}>
      <Navbar />
      <div className="container mx-auto py-20">
        <div className="flex justify-between items-center mb-10">
          <h1 className="font-bold text-4xl font-libre">Racks List</h1>
          <Link
            to={"/admin/racks/add"}
            className="w-14 h-14 bg-blue-400 rounded-lg flex items-center justify-center"
          >
            <PlusIcon width={30} height={30} color={"#fff"} />
          </Link>
        </div>
        <CustomTable
          titles={tableTitles}
          currentPage={currentPage}
          totalPage={Math.ceil(data?.racks?.length / limitData)}
          onPaginationClick={paginationCllickHandler}
          withPagination
        >
          {racksDataTable?.map((rack, i) => (
            <tr className="p-2" key={i}>
              <td className="border-b p-3 border-slate-600 text-left font-medium">
                {rack?.name}
              </td>
              <td className="border-b p-3 border-slate-600 text-left font-medium">
                {rack?.code}
              </td>
              <td className="border-b py-3 border-slate-600 text-left font-bold flex space-x-6">
                <Link
                  to={`/admin/racks/${rack?.id}`}
                  className={"cursor-pointer"}
                >
                  <div className={"bg-yellow-400 p-2 w-max rounded-xl"}>
                    <PencilAltIcon width={30} height={30} color={"#fff"} />
                  </div>
                </Link>

                <button
                  className={"bg-red-600 p-2 w-max rounded-xl cursor-pointer"}
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
