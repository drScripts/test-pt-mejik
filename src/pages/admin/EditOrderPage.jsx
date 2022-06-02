import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { DetailItem, RenderIf } from "../../components";
import { Base, Navbar } from "../../containers";
import {
  CREATEBORROW,
  UPDATEBOOKMUTATE,
  UPDATEORDER,
} from "../../graphql/mutations";
import { GETORDER } from "../../graphql/queries";
import moment from "moment";

export default function EditOrderPage() {
  const { id } = useParams();
  const { data, loading, refetch } = useQuery(GETORDER, {
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

  const [updateOrder, { loading: updateOrderLoading }] = useMutation(
    UPDATEORDER,
    {
      onError: (err) => {
        toast.error(err.message);
      },
      onCompleted: () => {
        refetch();
      },
    }
  );
  const [createBorrow, { loading: loadingBorrow }] = useMutation(CREATEBORROW, {
    onError: (err) => {
      toast.error(err.message);
    },
    onCompleted: () => {
      toast.success("Successfully create borrow!");
      refetch();
    },
  });

  const startBorrow = () => {
    if (data?.order?.book?.status !== "AVAILABLE") {
      toast.error("Can't start borrow, Book Still Borrowed!");
    } else {
      const inputBorrow = {
        dateStart: moment(new Date(data?.order?.dateStart)).format(
          "YYYY-MM-DD H:m:s"
        ),
        dueDate: moment(new Date(data?.order?.dueDate)).format(
          "YYYY-MM-DD H:m:s"
        ),
        bookId: data?.order?.book?.id,
        userId: data?.order?.user?.id,
        status: "BORROWED",
      };

      createBorrow({
        variables: {
          input: inputBorrow,
        },
        onCompleted: () => {
          const inputUpdateBook = {
            status: "BORROWED",
          };

          const inputUpdateOrder = {
            status: "APPROVED",
          };

          updateBook({
            variables: {
              input: inputUpdateBook,
              id: data?.order?.book?.id,
            },
          });

          updateOrder({
            variables: {
              input: inputUpdateOrder,
              id: data?.order?.id,
            },
          });
        },
      });
    }
  };

  const approveOrder = () => {
    const inputBorrow = {
      dateStart: moment(new Date(data?.order?.dateStart)).format(
        "YYYY-MM-DD H:m:s"
      ),
      dueDate: moment(new Date(data?.order?.dueDate)).format(
        "YYYY-MM-DD H:m:s"
      ),
      bookId: data?.order?.book?.id,
      userId: data?.order?.user?.id,
      status: null,
    };
    createBorrow({
      variables: {
        input: inputBorrow,
      },
      onCompleted: () => {
        updateOrder({
          variables: {
            input: {
              status: "APPROVED",
            },
            id,
          },
        });
        updateBook({
          variables: {
            input: {
              status: "AVAILABLE",
            },
            id: data?.order?.book?.id,
          },
        });
      },
    });
  };

  return (
    <Base
      isLoading={
        loading || updateBookLoading || loadingBorrow || updateOrderLoading
      }
    >
      <Navbar />

      <section className="py-14">
        <div className="container mx-auto flex-col justify-center items-center">
          <div className="flex items-start space-x-44 justify-center">
            <img
              src={
                data?.order?.book?.cover ??
                "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1626716201l/57577167.jpg"
              }
              alt="book detail"
              className="rounded-md shadow-xl"
              width={400}
              height={400}
            />
            <div className="font-libre max-w-xl w-full ">
              <h1 className="text-4xl font-bold font-libre">
                {data?.order?.book?.name}
              </h1>

              <DetailItem
                title={"Availability"}
                value={data?.order?.book?.status}
                valueClass={`${
                  data?.order?.book?.status === "AVAILABLE"
                    ? "text-green-600"
                    : "text-red-600"
                } capitalize`}
              />
              <DetailItem
                title={"Category"}
                value={data?.order?.book?.category?.name}
              />
              <DetailItem
                title={"Rack"}
                value={data?.order?.book?.rack?.name}
              />
              <DetailItem
                title={"Current Order Status"}
                value={data?.order?.status}
                valueClass={`${
                  data?.order?.status === "APPROVED"
                    ? "text-green-600"
                    : "text-yellow-400"
                } capitalize`}
              />
              <DetailItem title={"Author"}>
                <Link to={"/"}>
                  <div className="flex mt-3 space-x-4">
                    <img
                      src={
                        data?.order?.book?.author?.photo ??
                        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                      }
                      alt="Author profile"
                      className={"rounded-full w-16 h-16 box-fit object-cover"}
                    />
                    <div>
                      <h3 className="font-bold text-lg">
                        {data?.order?.book?.author?.name}
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
                {`${data?.order?.user?.firstName} ${data?.order?.user?.lastName}`}
              </p>
            </div>
            <div className="flex x-space-9 items-center">
              <p className="mt-3 whitespace-pre-wrap text-justify text-xl font-libre text-bold">
                User Email :{" "}
              </p>
              <p className="mt-3 whitespace-pre-wrap text-justify text-xl font-libre text-medium">
                {`${data?.order?.user?.email}`}
              </p>
            </div>
            <RenderIf condition={data?.order?.user?.phoneNumber !== null}>
              <div className="flex x-space-9 items-center">
                <p className="mt-3 whitespace-pre-wrap text-justify text-xl font-libre text-bold">
                  User Phone Number :{" "}
                </p>
                <p className="mt-3 whitespace-pre-wrap text-justify text-xl font-libre text-medium">
                  {`${data?.order?.user?.phoneNumber}`}
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
                {`${generateReadableDate(data?.order?.dateStart)}`}
              </p>
            </div>
            <div className="flex x-space-9 items-center">
              <p className="mt-3 whitespace-pre-wrap text-justify text-xl font-libre text-bold">
                End Date Days :{" "}
              </p>
              <p className="mt-3 whitespace-pre-wrap text-justify text-xl font-libre text-medium">
                {`${generateReadableDate(data?.order?.dueDate)}`}
              </p>
            </div>
            <RenderIf condition={data?.order?.status === "PENDING"}>
              <div className="text-right w-full mt-8 space-x-9">
                <button
                  className="bg-brownLightPastel hover:bg-brownLight text-lg font-bold px-12 py-3 rounded-xl text-white shadow-lg"
                  onClick={startBorrow}
                >
                  Start Borrow
                </button>

                <button
                  className="bg-brownLightPastel hover:bg-brownLight text-lg font-bold px-12 py-3 rounded-xl text-white shadow-lg"
                  onClick={approveOrder}
                >
                  Approve Order
                </button>
              </div>
            </RenderIf>
          </div>
        </div>
      </section>
    </Base>
  );
}
