import React, { useCallback, useState } from "react";
import Image from "next/image";
import {
  SearchIcon,
  GlobeAltIcon,
  UserCircleIcon,
  UsersIcon,
  MenuIcon,
  UserIcon,
} from "@heroicons/react/solid";
import logo from "../img/logo.png";
import logoimg from "../img/logo_img.png";

import { useRouter } from "next/dist/client/router";

const Header = ({ placeholder }) => {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-2 md:px-10">
      {/* left section */}
      <div
        className="relative flex items-center h-10 cursor-pointer my-auto"
        onClick={() => {
          router.push("/");
        }}
      >
        {/* using nextjs image tag */}
        <Image src={logo} layout="fill" objectFit="contain" objectPosition="left" />
      </div>

      {/* middle section */}
      <div className="flex items-center relative h-10">
        {/* <Image src={logoimg} layout="fill" objectFit="contain" objectPosition="center" /> */}
      </div>

      {/* right section */}
      <div className="flex items-center space-x-4 justify-end text-gray-500">
        <div className="flex items-center border-2 p-1 rounded-full cursor-pointer">
          <MenuIcon className="h-6" />
          <UserCircleIcon className="h-6" />
        </div>
      </div>
    </header>
  );
};

export default Header;
