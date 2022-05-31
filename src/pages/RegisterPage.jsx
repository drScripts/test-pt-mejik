import { gql, useMutation } from "@apollo/client";
import {
  ArrowLeftIcon,
  KeyIcon,
  MailIcon,
  PhoneIcon,
  UserIcon,
} from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { GeneralInput } from "../components";
import Base from "../containers/Base";
import { setAppLoading, userSuccessLogin } from "../reducers/root";

export default function RegisterPage() {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const REGISTERQUERY = gql`
    mutation register($input: RegisterInput) {
      register(input: $input) {
        token
        user {
          id
          role
          firstName
          lastName
          email
        }
      }
    }
  `;

  const [register, { data, loading, error }] = useMutation(REGISTERQUERY);

  useEffect(() => {
    dispatch(
      setAppLoading({
        condition: loading,
      })
    );
  }, [loading, dispatch]);

  useEffect(() => {
    if (data) {
      dispatch(
        userSuccessLogin({
          user: data.register.user,
          token: data.register.token,
        })
      );
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  const onFormChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    register({
      variables: {
        input: formState,
      },
    });
  };

  return (
    <Base>
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
              Let's Register to your account and <br /> read all books for free!
            </h1>
          </div>
          <div className="flex-1 bg-white flex flex-col justify-center  rounded-r-xl relative">
            <Link to={"/login"}>
              <ArrowLeftIcon
                width={45}
                height={35}
                className={"absolute top-4 right-4"}
              />
            </Link>
            <div className="px-28">
              <h1 className="text-4xl font-libre font-medium">
                Let's Get Started !
              </h1>
              <p className="text-xl mt-3 capitalize text-gray-400">
                Already have an account?{" "}
                <Link to={"/login"} className={"text-blue-500 underline"}>
                  Login!
                </Link>
              </p>
              <form onSubmit={onSubmit}>
                <div className="flex justify-between space-x-7">
                  <GeneralInput
                    id={"firstName"}
                    name={"firstName"}
                    label={"Your Firstname"}
                    placeholder={"Example"}
                    type={"text"}
                    value={formState.firstName}
                    icon={<UserIcon width={30} height={30} />}
                    className={"mt-5 w-full"}
                    required
                    onChange={onFormChange}
                  />
                  <GeneralInput
                    id={"lastName"}
                    name={"lastName"}
                    label={"Your Lastname"}
                    placeholder={"Example Lastname"}
                    type={"text"}
                    value={formState.lastName}
                    icon={<UserIcon width={30} height={30} />}
                    className={"mt-5 w-full"}
                    required
                    onChange={onFormChange}
                  />
                </div>
                <GeneralInput
                  id={"phoneNumber"}
                  name={"phoneNumber"}
                  label={"Phone Number"}
                  placeholder={"Your Phone Number"}
                  type={"text"}
                  value={formState.phoneNumber}
                  icon={<PhoneIcon width={30} height={30} />}
                  className={"mt-5"}
                  required
                  onChange={onFormChange}
                />
                <GeneralInput
                  id={"email"}
                  name={"email"}
                  label={"Email address"}
                  placeholder={"example.com@domain.com"}
                  type={"email"}
                  value={formState.email}
                  icon={<MailIcon width={30} height={30} />}
                  className={"mt-5"}
                  required
                  onChange={onFormChange}
                />
                <GeneralInput
                  id={"password"}
                  name={"password"}
                  label={"Password"}
                  placeholder={"Secure password"}
                  type={"password"}
                  value={formState.password}
                  icon={<KeyIcon width={30} height={30} />}
                  className={"mt-5"}
                  required
                  onChange={onFormChange}
                />
                <button className="w-full py-3 bg-brownLightPastel hover:bg-brownLight rounded-xl text-2xl font-bold text-white mt-10">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
}
