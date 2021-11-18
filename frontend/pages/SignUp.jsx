import { useRouter } from "next/dist/client/router";
import { useDispatch, useSelector } from "react-redux";
import React, { useCallback, useEffect, useState } from "react";
import logo from "../img/logo.png";
import Image from "next/image";
import { rootReducer } from "../store/configureStore";
import axios from "axios";
import { useAlert } from "react-alert";

const SignUp = () => {
  const alert = useAlert();
  const router = useRouter();
  const [authObj, setAuthObj] = useState({
    userId: "",
    email: "",
    password: "",
    passwordCheck: "",
  });
  const { userId, email, password, passwordCheck } = authObj;

  const [idCheck, setIdCheck] = useState(false);
  const [pwCheck, setPwCheck] = useState(false);
  const [emailCheck, setEmailCheck] = useState(false);
  const [pwValidation, setPwValidation] = useState(false);
  const [idError, setIdError] = useState("");
  const [pwError, setPwError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [pwvError, setPwvError] = useState("");

  const isId = () => {
    const idRegex = /^[0-9a-z]{5,12}$/;
    if (idRegex.test(authObj.userId)) {
      setIdCheck(true);
    } else {
      setIdCheck(false);
    }
    try {
      if (!idCheck) throw new Error("Id를 확인해주세요. (아이디는 5~12길이의 영문 소문자입니다.)");
    } catch (error) {
      setIdError(error.message);
    }
  };

  const isPw = () => {
    // 최소 8 자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자
    const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
    if (pwRegex.test(authObj.password)) {
      setPwCheck(true);
    } else setPwCheck(false);

    try {
      if (!pwCheck)
        throw new Error(
          "최소 8 자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자가 포함되어야 합니다"
        );
      else setPwError("");
    } catch (error) {
      setPwError(error.message);
    }
  };

  const isEmail = () => {
    const emailRegex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

    if (emailRegex.test(authObj.email)) {
      setEmailCheck(true);
    } else setEmailCheck(false);

    try {
      if (!emailCheck) throw new Error("Email 형식을 확인해주세요.");
      else setEmailError("");
    } catch (error) {
      setEmailError(error.message);
    }
  };

  const pwVali = () => {
    if (authObj.password === authObj.passwordCheck) setPwValidation(true);
    else setPwValidation(false);

    try {
      if (!pwValidation) throw new Error("비밀번호가 일치하지 않습니다.");
      else setPwvError("");
    } catch (error) {
      setPwvError(error.message);
    }
  };

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
  });

  useEffect(() => {}, [authObj]);

  const submitHandler = useCallback(async (e) => {
    e.preventDefault();
    const data = {
      userId,
      password,
      email,
    };
    axios
      .post("/api/users/regist", data)
      .then((res) => {
        // console.log(res.data);
        // alert.success("Welcome to Testsman :)");
        router.push("/Login");
      })
      .catch((error) => {
        // if (error.response.status === 409) {
        //   alert.error("이미 사용중인 아이디입니다.");
        // }
      });
  });

  return (
    <div>
      {/* <body className="body-bg min-h-screen pb-6 px-2 md:px-0"> */}
      <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl  mt-[200px]">
        <section className="">
          {/* <h3 className="font-bold text-2xl">Welcome to Testman</h3> */}

          <div className="relative h-16 mx-auto justify-center w-40">
            <Image src={logo} layout="fill" objectFit="contain" objectPosition="left" />
          </div>
        </section>

        <section className="mt-6">
          <form className="flex flex-col">
            <div className="mb-5 pt-3 rounded bg-gray-200">
              <label className="block text-gray-700 text-sm font-bold mb-0 ml-3" htmlFor="Id">
                ID
              </label>
              <input
                type="text"
                id="userId"
                className={
                  idCheck
                    ? "bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4  border-green-400 transition duration-500 px-3 pb-3"
                    : "bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
                }
                onChange={changeHandler}
                onKeyUp={isId}
              />
            </div>
            {!idCheck && authObj.userId.length > 0 ? (
              <span className=" px-2 pb-3 mt-[-8px] text-xs text-red-400">{idError}</span>
            ) : (
              ""
            )}
            <div className="mb-6 pt-3 rounded bg-gray-200">
              <label className="block text-gray-700 text-sm font-bold mb-0 ml-3" htmlFor="eMail">
                E-Mail
              </label>
              <input
                type="email"
                id="email"
                className={
                  emailCheck
                    ? "bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4  border-green-400 transition duration-500 px-3 pb-3"
                    : "bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
                }
                onChange={changeHandler}
                onKeyUp={isEmail}
              />
            </div>
            {!emailCheck && authObj.email.length > 0 ? (
              <span className=" px-2 pb-3 mt-[-8px] text-xs text-red-400">{emailError}</span>
            ) : (
              ""
            )}

            <div className="mb-6 pt-3 rounded bg-gray-200">
              <label className="block text-gray-700 text-sm font-bold mb-0 ml-3" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className={
                  pwCheck
                    ? "bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4  border-green-400 transition duration-500 px-3 pb-3"
                    : "bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
                }
                onChange={changeHandler}
                onKeyUp={isPw}
              />
            </div>
            {!pwCheck && authObj.password.length > 0 ? (
              <span className=" px-2 pb-3 mt-[-8px] text-xs text-red-400">{pwError}</span>
            ) : (
              ""
            )}
            <div className="mb-6 pt-3 rounded bg-gray-200">
              <label
                className="block text-gray-700 text-sm font-bold mb-0 ml-3"
                htmlFor="passwordValidation"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="passwordCheck"
                className={
                  pwValidation
                    ? "bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4  border-green-400 transition duration-500 px-3 pb-3"
                    : "bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
                }
                onChange={changeHandler}
                onKeyUp={pwVali}
              />
            </div>
            {!pwValidation &&
            authObj.passwordCheck.length > 0 &&
            !pwCheck &&
            authObj.password.length === 0 ? (
              <span className=" px-2 pb-3 mt-[-8px] text-xs text-red-400">{pwvError}</span>
            ) : (
              ""
            )}
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
              className={
                idCheck && pwCheck && emailCheck && pwValidation
                  ? "bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200 mt-16 h-10"
                  : "bg-purple-300  text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200 disabled:opacity-50 cursor-default mt-16 h-10"
              }
              // className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
              type="submit"
              onClick={submitHandler}
              disabled={idCheck && pwCheck && emailCheck && pwValidation ? false : true}
            >
              Sign Up
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

export default SignUp;
