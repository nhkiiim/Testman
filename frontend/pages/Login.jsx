import { useRouter } from "next/dist/client/router";
import React, { useCallback, useState } from "react";
import logo from "../img/logo.png";
import Image from "next/image";
import axios from "axios";
import { useDispatch } from "react-redux";
import * as userActions from "../store/modules/user";

const Login = () => {
  const [inputObj, setInputObj] = useState({
    userId: "",
    password: "",
  });

  const { userId, password } = inputObj;
  const dispatch = useDispatch();

  const changeHandler = (e) => {
    const {
      target: { id, value },
    } = e;
    setInputObj((inputObj) => ({
      ...inputObj,
      [id]: value,
    }));
  };
  const router = useRouter();
  const loginHandler = (e) => {
    e.preventDefault();
    const data = {
      userId: inputObj.userId,
      password: inputObj.password,
    };
    axios
      .post("/api/users/login", data)
      .then((res) => {
        // console.log(res.data.response.user);
        const { accessToken } = res.data.response.token;

        axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        dispatch(userActions.setUserState(res.data.response.user));
        dispatch(userActions.setUserToken(res.data.response.token));
        router.push({
          pathname: "/MyPage",
          query: {
            id: res.data.response.user.userId,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {/* <body className="body-bg min-h-screen pb-6 px-2 md:px-0"> */}
      <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl mt-48">
        <section className="">
          <div className="relative h-16 mx-auto justify-center w-40">
            <Image src={logo} layout="fill" objectFit="contain" objectPosition="left" />
          </div>
        </section>

        <section className="mt-6">
          <form className="flex flex-col">
            <div className="mb-6 pt-3 rounded bg-gray-200">
              <label className="block text-gray-700 text-sm font-bold mb-0 ml-3" htmlFor="Id">
                ID
              </label>
              <input
                onChange={changeHandler}
                type="text"
                id="userId"
                className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
              />
            </div>
            <div className="mb-6 pt-3 rounded bg-gray-200">
              <label className="block text-gray-700 text-sm font-bold mb-0 ml-3" htmlFor="password">
                Password
              </label>
              <input
                onChange={changeHandler}
                type="password"
                id="password"
                className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
              />
            </div>
            <div className="flex justify-end">
              <p className="text-sm text-purple-600 cursor-default mb-6">
                아직 계정이 없으신가요 ?{" "}
                <a
                  onClick={() => {
                    router.push("/SignUp");
                  }}
                  className="font-bold hover:underline cursor-pointer"
                >
                  가입하기
                </a>
              </p>
            </div>
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
              type="submit"
              onClick={loginHandler}
            >
              Sign In
            </button>
          </form>
        </section>
      </main>

      <footer className="max-w-lg mx-auto flex justify-center text-black">
        <a href="#" className="hover:underline">
          Contact
        </a>
        <span className="mx-3">•</span>
        <a href="#" className="hover:underline">
          Privacy
        </a>
      </footer>
      {/* </body> */}
    </div>
  );
};

export default Login;
