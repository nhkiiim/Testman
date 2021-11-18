import { useRouter } from "next/dist/client/router";
import React, { useCallback, useState } from "react";
import logo from "../img/logo.png";
import Image from "next/image";
import axios from "axios";
import { useDispatch } from "react-redux";
import * as userActions from "../store/modules/user";
import * as pageAction from "../store/modules/page";
import { useCookies } from "react-cookie";
import { useAlert } from "react-alert";

const Login = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [inputObj, setInputObj] = useState({
    userId: "",
    password: "",
  });
  const alert = useAlert();

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
  const loginHandler = async (e) => {
    e.preventDefault();
    const data = {
      userId: inputObj.userId,
      password: inputObj.password,
    };
    await axios
      .post("/api/users/login", data)
      .then((res) => {
        console.log(res.data);
        setCookie("token", res.data.response.token);

        axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.response.token}`;

        dispatch(userActions.setUserState(res.data.response.user));
        dispatch(userActions.setUserToken(res.data.response.token));
        dispatch(pageAction.setPageState(0));
        router.push({
          pathname: "/MyPage",
        });
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 404) {
          alert.error("회원 정보가 존재하지 않습니다.");
        } else if (error.response.status === 401) {
          alert.error("비밀번호가 일치하지 않습니다.");
        } else {
          console.error(error);
        }
      });
  };

  return (
    <div>
      <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl mt-[250px] h-[430px]">
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
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200 mt-16 h-10"
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
    </div>
  );
};

export default Login;
