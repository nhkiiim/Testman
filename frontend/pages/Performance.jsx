import { useRouter } from "next/router";
import React from "react";
import Header2 from "../components/Header2";

const Performance = () => {
  const router = useRouter();
  const query = router.query;

  return (
    <div>
      <Header2 />
    </div>
  );
};

export default Performance;
