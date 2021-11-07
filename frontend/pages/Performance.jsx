import { useRouter } from "next/router";
import React from "react";
import Header2 from "../components/Header2";

const Performance = () => {
  const router = useRouter();
  const { category } = router.query;
  return (
    <div>
      <Header2 category={category} />
    </div>
  );
};

export default Performance;
