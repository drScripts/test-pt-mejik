import { ArrowLeftIcon, KeyIcon, MailIcon } from "@heroicons/react/solid";
import React from "react";
import { Link } from "react-router-dom";
import { GeneralInput } from "../components";

export default function LoginPage() {
  return (
    <div className="px-12 py-12 h-screen">
      <div className="w-full h-full bg-brownLightPastel flex rounded-xl shadow-xl">
        <div className="flex-1 flex items-center flex-col justify-center space-y-14">
          <iframe
            src="https://embed.lottiefiles.com/animation/95530"
            title="login animation"
            width={500}
            height={500}
          ></iframe>
          <h1 className="text-3xl text-center font-bold text-white">
            Let's Login to your account and <br /> read all books for free!
          </h1>
        </div>
        <div className="flex-1 bg-white flex flex-col justify-center  rounded-r-xl relative">
          <Link to={"/"}>
            <ArrowLeftIcon
              width={45}
              height={35}
              className={"absolute top-4 right-4"}
            />
          </Link>
          <div className="px-28">
            <h1 className="text-4xl font-libre font-medium">
              Login To Your Account !
            </h1>
            <p className="text-xl mt-3 capitalize text-gray-400">
              Don't have an account?{" "}
              <Link to={"/"} className={"text-blue-500 underline"}>
                register
              </Link>
            </p>
            <GeneralInput
              id={"email"}
              name={"email"}
              label={"Email address"}
              placeholder={"example.com@domain.com"}
              type={"text"}
              value={""}
              icon={<MailIcon width={30} height={30} />}
              className={"mt-5"}
            />
            <GeneralInput
              id={"password"}
              name={"password"}
              label={"Password"}
              placeholder={"Secure password"}
              type={"text"}
              value={""}
              icon={<KeyIcon width={30} height={30} />}
              className={"mt-5"}
            />
            <button className="w-full py-3 bg-brownLightPastel hover:bg-brownLight rounded-xl text-2xl font-bold text-white mt-10">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
