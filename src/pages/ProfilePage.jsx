import { Tab } from "@headlessui/react";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { HistoryBorrow, HistoryOrder } from "../components";
import { Base, Navbar } from "../containers";

export default function ProfilePage() {
  document.title = "Story Book | Profile";
  const [userHistory, setUserHistory] = useState({});
  const rootState = useSelector((state) => state.root);

  const getHistoryUser = useCallback(() => {
    fetch(
      `https://dev-libraryzyhwf.microgen.id/api/history/${rootState?.user?.id}`
    )
      .then((res) => res.json())
      .then((value) => {
        setUserHistory(value);
      });
  }, [rootState?.user?.id]);

  useEffect(() => {
    getHistoryUser();
  }, [getHistoryUser]);

  if (!rootState.isLogin) {
    return <Navigate to={"/"} />;
  }

  return (
    <Base>
      <Navbar />
      <div className="container mx-auto py-16">
        <h1 className="text-4xl font-libre font-bold">Profile</h1>
        <div className="grid grid-cols-12 gap-16 mt-8">
          <div className="bg-white col-span-4 shadow-xl rounded-xl flex flex-col max-h-600">
            <img
              src={
                "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              }
              alt="Profile"
              className="max-h-96 h-full w-full object-cover rounded-sm"
            />
            <div className="grid grid-cols-12 p-2 mt-5">
              <div className="font-bold col-span-4">First Name</div>
              <div>{rootState?.user?.firstName}</div>
            </div>
            <div className="grid grid-cols-12 p-2">
              <div className="font-bold col-span-4">Last Name</div>
              <div>{rootState?.user?.lastName}</div>
            </div>
            <div className="grid grid-cols-12 p-2">
              <div className="font-bold col-span-4">Email</div>
              <p className="max-w-xs">{rootState?.user?.email}</p>
            </div>
            <div className="grid grid-cols-12 p-2">
              <div className="font-bold col-span-4">Role</div>
              <div>{rootState?.user?.role}</div>
            </div>
          </div>
          <div className="bg-green col-span-8">
            <Tab.Group>
              <Tab.List className={"space-x-5"}>
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={`px-4 py-2 font-libre font-medium rounded-md text-lg ${
                        selected ? "bg-blue-400" : "bg-transparent"
                      }`}
                    >
                      History Orders
                    </button>
                  )}
                </Tab>
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={`px-4 py-2 font-libre font-medium rounded-md text-lg ${
                        selected ? "bg-blue-400" : "bg-transparent"
                      }`}
                    >
                      History Borrows
                    </button>
                  )}
                </Tab>
              </Tab.List>
              <Tab.Panels>
                <Tab.Panel>
                  <HistoryOrder data={userHistory?.orders ?? []} />
                </Tab.Panel>
                <Tab.Panel>
                  <HistoryBorrow data={userHistory?.borrows ?? []} />
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </div>
    </Base>
  );
}
