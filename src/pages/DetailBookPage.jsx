import { useMutation, useQuery } from "@apollo/client";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  CustomDialog,
  DetailItem,
  GeneralInput,
  RenderIf,
} from "../components";
import { Base, Navbar } from "../containers";
import { CREATEORDER } from "../graphql/mutations";
import { CHECKBOOKBORROWED, DETAILBOOKQUERY } from "../graphql/queries";
import { setAppLoading } from "../reducers/root";

export default function DetailBookPage() {
  const dispatch = useDispatch();
  const rootState = useSelector((state) => state.root);
  const [modal, setModal] = useState({ show: false, title: "" });
  const [form, setForm] = useState({
    dateStart: "",
    dueDate: "",
  });
  const { id } = useParams();

  const { data, loading } = useQuery(DETAILBOOKQUERY, {
    variables: {
      id: id,
    },
  });

  const { data: datacheckBorrowed, loading: loadingCheckBorrowed } = useQuery(
    CHECKBOOKBORROWED,
    {
      variables: {
        bookId: id,
      },
    }
  );

  const [createOrder, { data: dataOrder, loading: loadingCreateOrder, error }] =
    useMutation(CREATEORDER);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }

    dispatch(
      setAppLoading({
        condition: loading || loadingCheckBorrowed || loadingCreateOrder,
      })
    );
  }, [loading, dispatch, loadingCheckBorrowed, loadingCreateOrder, error]);

  useEffect(() => {
    if (dataOrder) {
      setForm({
        dateStart: "",
        dueDate: "",
      });
      setModal({ title: "", show: false });
    }
  }, [dataOrder]);

  const modalHandler = (title) => {
    setModal({
      show: true,
      title,
    });
  };

  const onInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (moment(form.dueDate).isBefore(form.dateStart)) {
      toast.error("Due date must be on a future after start date");
      return;
    }

    if (
      moment(form.dateStart).isBefore(moment(new Date()).format("YYYY-MM-DD"))
    ) {
      toast.error("Start date must be on future or now");
      return;
    }

    const input = {
      ...form,
      bookId: id,
      userId: rootState?.user?.id,
    };

    createOrder({
      variables: { input },
    });
  };

  return (
    <Base>
      <Navbar />
      <CustomDialog
        show={modal.show}
        setIsOpen={(show) => setModal({ ...modal, show })}
      >
        <h1 className="font-bold text-4xl font-libre mb-3">{modal.title}</h1>
        <RenderIf
          condition={
            datacheckBorrowed?.borrows && datacheckBorrowed?.borrows.length
          }
        >
          <p className="font-bold mb-4">
            This Book Will available After :{" "}
            {datacheckBorrowed &&
              moment(new Date(datacheckBorrowed?.borrows[0]?.dateStart)).format(
                "DD, MMM YYYY H:m:s"
              )}
          </p>
        </RenderIf>
        <hr />
        <form onSubmit={onSubmit}>
          <GeneralInput
            type="datetime-local"
            label={"Start Book Date"}
            id={"dateStart"}
            name={"dateStart"}
            className={"mt-5"}
            onChange={onInputChange}
            required
            value={form.dateStart}
          />
          <GeneralInput
            type="datetime-local"
            label={"End Book Date"}
            id={"dueDate"}
            name={"dueDate"}
            className={"mt-4"}
            onChange={onInputChange}
            required
            value={form.dueDate}
          />
          <div className="text-right">
            <button className="mt-4 bg-brownLightPastel hover:bg-brownLight px-5 py-3 font-medium text-xl rounded-lg text-white">
              Submit
            </button>
          </div>
        </form>
      </CustomDialog>
      <section className="py-14">
        <div className="container mx-auto flex-col justify-center items-center">
          <div className="flex items-start space-x-44 justify-center">
            <img
              src={
                data?.book?.cover ??
                "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1626716201l/57577167.jpg"
              }
              alt="book detail"
              className="rounded-md shadow-xl"
              width={400}
              height={400}
            />
            <div className="font-libre max-w-xl w-full ">
              <h1 className="text-4xl font-bold font-libre">
                {data?.book?.name}
              </h1>

              <DetailItem
                title={"Availability"}
                value={data?.book?.status}
                valueClass={`${
                  data?.book?.status ? "text-green-600" : "text-red-600"
                } capitalize`}
              />
              <DetailItem
                title={"Category"}
                value={data?.book?.category?.name}
              />
              <DetailItem title={"Rack"} value={data?.book?.rack?.name} />
              <DetailItem title={"Author"}>
                <Link to={"/"}>
                  <div className="flex mt-3 space-x-4">
                    <img
                      src={
                        data?.book?.author?.photo ??
                        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                      }
                      alt="Author profile"
                      className={"rounded-full w-16 h-16 box-fit object-cover"}
                    />
                    <div>
                      <h3 className="font-bold text-lg">
                        {data?.book?.author?.name}
                      </h3>
                      <h4 className="font-medium text-gray-400">Book Author</h4>
                    </div>
                  </div>
                </Link>
              </DetailItem>
            </div>
          </div>

          <div className="flex flex-col items-start px-48">
            <h1 className="font-bold font-libre text-3xl mt-14">Description</h1>
            <p className="mt-3 whitespace-pre-wrap text-justify text-md">
              {data?.book?.description ??
                `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus, earum? Iusto magni beatae veniam cumque corrupti nesciunt labore quos, itaque accusantium assumenda dicta modi odio recusandae commodi aliquid amet provident. Rem animi quisquam perspiciatis repellat sint temporibus iure consectetur ipsam modi aliquid delectus laudantium facilis ad libero, ea et dolorum minima. Dolores, explicabo iure fugit iusto accusantium corrupti quo impedit.`}
            </p>

            <div className="text-right w-full mt-8 space-x-9">
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
            </div>
          </div>
        </div>
      </section>
    </Base>
  );
}
