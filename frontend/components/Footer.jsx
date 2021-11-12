import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <div
      className="relative grid grid-cols-1 md:grid-cols-4 gap-y-10 px-12 py-12
    bg-gray-100 text-gray-600 my-52"
    >
      <div className="space-y-4 text-xs text-gray-800">
        <h5 className="font-bold">ABOUT</h5>
        <a
          className="pt-3"
          target="_blank"
          href="https://www.ssafy.com/ksp/jsp/swp/swpMain.jsp"
          rel="noreferrer"
        >
          <p className="mt-4">SSAFY 5th</p>
        </a>
        <p>How we works</p>
        <p>Notice</p>
        <p>HENH</p>
      </div>
      <div className="space-y-4 text-xs text-gray-800">
        <h5 className="font-bold">TOOLS</h5>
        <p>Dashboard</p>
        <p>Performance</p>
        <p>Projects</p>
      </div>
      <div className="space-y-4 text-xs text-gray-800">
        <h5 className="font-bold">DOCS</h5>
        <p>How to use</p>
      </div>

      <div className="space-y-4 text-xs text-gray-800">
        <h5 className="font-bold">API</h5>
        <p>PageSpeed Insight API by google</p>
      </div>
    </div>
  );
};

export default Footer;
