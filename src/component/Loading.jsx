import React from "react";
import { ClipLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full m-0 z-10">
      <ClipLoader size={150} color={"#bbb"} loading={true} />
    </div>
  );
};

export default Loading;
