import { useRouter } from "next/dist/client/router";
import React, { useCallback, useEffect, useState } from "react";
import logo from "../img/logo.png";
import Image from "next/image";

const SignUp = () => {
  const router = useRouter();
  const [authObj, setAuthObj] = useState({
    id: "",
    email: "",
    password: "",
    passwordCheck: "",
  });

  const [idCheck, setIdCheck] = useState(false);
  const [checkError, setCheckError] = useState("");
  const [error, setError] = useState("");

  const changeHandler = useCallback(async (e) => {
    const {
      target: { id, value },
    } = e;
    setAuthObj((authObj) => ({
      ...authObj,
      [id]: value,
    }));
    // db 통신 후 아이디 중복 여부 판단
    // if(id == "id"){
    //   const idCheck = await
    // }

    if (id == "email") {
    }
  });
  const regexCheck = () => {};
  useEffect(() => {
    console.log(idCheck);
  }, [changeHandler, authObj]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      let data;

      if (!idCheck) throw new Error("Id를 확인해주세요.");
      else {
        router.push("/Login");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      {/* <body className="body-bg min-h-screen pb-6 px-2 md:px-0"> */}
      <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl mt-32">
        <section className="">
          {/* <h3 className="font-bold text-2xl">Welcome to Testman</h3> */}

          <div className="relative h-16 mx-auto justify-center w-40">
            <Image src={logo} layout="fill" objectFit="contain" objectPosition="left" />
          </div>
        </section>

        <section className="mt-6">
          <form className="flex flex-col" method="POST" action="#">
            <div className="mb-6 pt-3 rounded bg-gray-200">
              <label className="block text-gray-700 text-sm font-bold mb-0 ml-3" for="Id">
                ID
              </label>
              <input
                type="text"
                id="id"
                className={
                  idCheck
                    ? "bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4  border-green-400 transition duration-500 px-3 pb-3"
                    : "bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
                }
                onChange={changeHandler}
              />
            </div>
            <div>
              <span>{checkError}</span>
            </div>
            <div className="mb-6 pt-3 rounded bg-gray-200">
              <label className="block text-gray-700 text-sm font-bold mb-0 ml-3" for="eMail">
                E-Mail
              </label>
              <input
                type="email"
                id="email"
                className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
                onChange={changeHandler}
              />
            </div>
            <div className="mb-6 pt-3 rounded bg-gray-200">
              <label className="block text-gray-700 text-sm font-bold mb-0 ml-3" for="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
                onChange={changeHandler}
              />
            </div>
            <div className="mb-6 pt-3 rounded bg-gray-200">
              <label
                className="block text-gray-700 text-sm font-bold mb-0 ml-3"
                for="passwordValidation"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="passwordCheck"
                className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
                onChange={changeHandler}
              />
            </div>
            <div className="flex justify-end">
              <p className="text-sm text-purple-600  mb-6">
                이미 계정이 있으신가요 ?{" "}
                <a
                  onClick={() => {
                    router.push("/Login");
                  }}
                  className="font-bold hover:underline cursor-pointer"
                >
                  로그인하기
                </a>
              </p>
            </div>
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
              type="submit"
              onClick={submitHandler}
            >
              Sign Up
            </button>
            <span id="error">{error}</span>
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

export default SignUp;
