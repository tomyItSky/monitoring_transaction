import React from "react";
import { HashLoader } from "react-spinners";

const LoadingTable = () => {
  return (
    <div className="flex items-center justify-center w-full m-auto z-10">
      <HashLoader size={50} color={"#bbb"} loading={true} />
    </div>
  );
};

export default LoadingTable;
