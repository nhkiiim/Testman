import React, { useState } from "react";
import { css } from "@emotion/react";
import SyncLoader from "react-spinners/SyncLoader";

const override = css`
  display: block;
  margin: 2 auto;
  border-color: yellow;
`;

const Loading = () => {
  let [color, setColor] = useState("#F8E71C");
  return (
    <div>
      <SyncLoader color={color} css={override} size={120} />
    </div>
  );
};

export default Loading;
