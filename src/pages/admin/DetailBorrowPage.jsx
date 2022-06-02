import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { DetailItem, RenderIf } from "../../components";
import { Base, Navbar } from "../../containers";
import { UPDATEBOOKMUTATE, UPDATEBORROW } from "../../graphql/mutations";
import { GETBORROW } from "../../graphql/queries";
import moment from "moment";

export default function DetailBorrowPage() {
  const { id } = useParams();
  const { data, loading, refetch } = useQuery(GETBORROW, {
    variables: {
      id,
    },
  });

  const generateReadableDate = (dateString) => {
    return moment(new Date(dateString)).format("DD, MMM YYYY H:m");
  };

  const [updateBook, { loading: updateBookLoading }] = useMutation(
    UPDATEBOOKMUTATE,
    {
      onCompleted: () => {
        refetch();
      },
      onError: (err) => {
        toast.error(err.message);
      },
    }
  );

  const [updateBorrow, { loading: updateBorrowLoading }] = useMutation(
    UPDATEBORROW,
    {
      onCompleted: () => {
        refetch();
      },
      onError: (err) => {
        toast.error(err.message);
      },
    }
  );

  const startBorrow = () => {
    if (data?.borrow?.book?.status !== "AVAILABLE") {
      toast.error("Can't start borrow, Book Still Borrowed!");
    } else {
      updateBook({
        variables: {
          status: "BORROWED",
        },
      });
      updateBorrow({
        variables: {
          status: "BORROWED",
        },
      });
    }
  };

  const startReturn = () => {
    const due = moment(new Date(data?.borrow?.dueDate));
    const today = moment(new Date());
    const pinaltyDays = due.diff(today, "days");
    const status = pinaltyDays > 0 ? "OVER_TIME" : "ON_TIME";
    const input = {
      returnDate: today.format("DD, MMM YYYY H:m:s"),
      pinaltyDays,
      status,
    };

    updateBorrow({
      variables: {
        id,
        input,
      },
    });
  };

  return (
    <Base isLoading={loading || updateBookLoading || updateBorrowLoading}>
      <Navbar />

      <section className="py-14">
        <div className="container mx-auto flex-col justify-center items-center">
          <div className="flex items-start space-x-44 justify-center">
            <img
              src={
                data?.borrow?.book?.cover ??
                "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1626716201l/57577167.jpg"
              }
              alt="book detail"
              className="rounded-md shadow-xl"
              width={400}
              height={400}
            />
            <div className="font-libre max-w-xl w-full ">
              <h1 className="text-4xl font-bold font-libre">
                {data?.borrow?.book?.name}
              </h1>

              <DetailItem
                title={"Availability"}
                value={data?.borrow?.book?.status}
                valueClass={`${
                  data?.borrow?.book?.status === "AVAILABLE"
                    ? "text-green-600"
                    : "text-red-600"
                } capitalize`}
              />
              <DetailItem
                title={"Category"}
                value={data?.borrow?.book?.category?.name}
              />
              <DetailItem
                title={"Rack"}
                value={data?.borrow?.book?.rack?.name}
              />
              <DetailItem
                title={"Current Borrow Status"}
                value={data?.borrow?.status ?? "-"}
                valueClass={`${
                  data?.borrow?.status === "ON_TIME"
                    ? "text-green-600"
                    : data?.borrow?.status === "OVER_DUE"
                    ? "text-red-500"
                    : "text-yellow-400"
                } capitalize`}
              />
              <DetailItem title={"Author"}>
                <Link to={"/"}>
                  <div className="flex mt-3 space-x-4">
                    <img
                      src={
                        data?.borrow?.book?.author?.photo ??
                        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                      }
                      alt="Author profile"
                      className={"rounded-full w-16 h-16 box-fit object-cover"}
                    />
                    <div>
                      <h3 className="font-bold text-lg">
                        {data?.borrow?.book?.author?.name}
                      </h3>
                      <h4 className="font-medium text-gray-400">Book Author</h4>
                    </div>
                  </div>
                </Link>
              </DetailItem>
            </div>
          </div>

          <div className="flex flex-col items-start px-48">
            <h1 className="font-bold font-libre text-3xl mt-14">
              User Request
            </h1>
            <div className="flex x-space-9 items-center">
              <p className="mt-3 whitespace-pre-wrap text-justify text-xl font-libre text-bold">
                User Name :{" "}
              </p>
              <p className="mt-3 whitespace-pre-wrap text-justify text-xl font-libre text-medium">
                {`${data?.borrow?.user?.firstName} ${data?.borrow?.user?.lastName}`}
              </p>
            </div>
            <div className="flex x-space-9 items-center">
              <p className="mt-3 whitespace-pre-wrap text-justify text-xl font-libre text-bold">
                User Email :{" "}
              </p>
              <p className="mt-3 whitespace-pre-wrap text-justify text-xl font-libre text-medium">
                {`${data?.borrow?.user?.email}`}
              </p>
            </div>
            <RenderIf condition={data?.borrow?.user?.phoneNumber !== null}>
              <div className="flex x-space-9 items-center">
                <p className="mt-3 whitespace-pre-wrap text-justify text-xl font-libre text-bold">
                  User Phone Number :{" "}
                </p>
                <p className="mt-3 whitespace-pre-wrap text-justify text-xl font-libre text-medium">
                  {`${data?.borrow?.user?.phoneNumber}`}
                </p>
              </div>
            </RenderIf>

            <h1 className="font-bold font-libre text-3xl mt-14">
              Borrow Detail
            </h1>
            <div className="flex x-space-9 items-center">
              <p className="mt-3 whitespace-pre-wrap text-justify text-xl font-libre text-bold">
                Start Date Days :{" "}
              </p>
              <p className="mt-3 whitespace-pre-wrap text-justify text-xl font-libre text-medium">
                {`${generateReadableDate(data?.borrow?.dateStart)}`}
              </p>
            </div>
            <div className="flex x-space-9 items-center">
              <p className="mt-3 whitespace-pre-wrap text-justify text-xl font-libre text-bold">
                End Date Days :{" "}
              </p>
              <p className="mt-3 whitespace-pre-wrap text-justify text-xl font-libre text-medium">
                {`${generateReadableDate(data?.borrow?.dueDate)}`}
              </p>
            </div>
            <div className="flex x-space-9 items-center">
              <p className="mt-3 whitespace-pre-wrap text-justify text-xl font-libre text-bold">
                Pinalty Days :{" "}
              </p>
              <p className="mt-3 whitespace-pre-wrap text-justify text-xl font-libre text-medium">
                {`${
                  data?.borrow?.pinaltyDays
                    ? data?.borrow?.pinaltyDays + " Days"
                    : "-"
                }`}
              </p>
            </div>
            <div className="flex x-space-9 items-center">
              <p className="mt-3 whitespace-pre-wrap text-justify text-xl font-libre text-bold">
                Penalties Borrow :{" "}
              </p>
              <p className="mt-3 whitespace-pre-wrap text-justify text-xl font-libre text-medium">
                {`${data?.borrow?.penalties ?? "-"}`}
              </p>
            </div>
            <div className="flex x-space-9 items-center">
              <p className="mt-3 whitespace-pre-wrap text-justify text-xl font-libre text-bold">
                Return Date :{" "}
              </p>
              <p className="mt-3 whitespace-pre-wrap text-justify text-xl font-libre text-medium">
                {`${
                  data?.borrow?.returnDate
                    ? generateReadableDate(data?.borrow?.returnDate)
                    : "-"
                }`}
              </p>
            </div>

            <RenderIf condition={data?.borrow?.status === null}>
              <div className="text-right w-full mt-8 space-x-9">
                <button
                  className="bg-brownLightPastel hover:bg-brownLight text-lg font-bold px-12 py-3 rounded-xl text-white shadow-lg"
                  onClick={startBorrow}
                >
                  Start Borrow
                </button>
              </div>
            </RenderIf>
            <RenderIf condition={data?.borrow?.status === "BORROWED"}>
              <div className="text-right w-full mt-8 space-x-9">
                <button
                  className="bg-brownLightPastel hover:bg-brownLight text-lg font-bold px-12 py-3 rounded-xl text-white shadow-lg"
                  onClick={startReturn}
                >
                  Start Return
                </button>
              </div>
            </RenderIf>
          </div>
        </div>
      </section>
    </Base>
  );
}
