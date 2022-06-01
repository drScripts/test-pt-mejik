import { useQuery } from "@apollo/client";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { DetailItem, RenderIf } from "../../components";
import { Base, Navbar } from "../../containers";
import { GETORDER } from "../../graphql/queries";

export default function EditOrderPage() {
  const { id } = useParams();
  const { data, loading } = useQuery(GETORDER, {
    variables: {
      id,
    },
  });

  return (
    <Base isLoading={loading}>
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

            {/* <div className="text-right w-full mt-8 space-x-9">
          <button
            className="bg-brownLightPastel hover:bg-brownLight text-lg font-bold px-12 py-3 rounded-xl text-white shadow-lg"
            disabled={false}
            onClick={() => modalHandler("Order Book")}
          >
            Order
          </button>
          <button
            className="bg-brownLightPastel hover:bg-brownLight text-lg font-bold px-12 py-3 rounded-xl text-white shadow-lg"
            onClick={() => modalHandler("Booking Book")}
          >
            Booking Book
          </button>
        </div> */}
          </div>
        </div>
      </section>
    </Base>
  );
}
