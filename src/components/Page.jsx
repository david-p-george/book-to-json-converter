import React from "react";

import InputSection from "./InputSection";
import Output from "./Output";

const Page = () => {
  return (
    <div className="flex flex-col justify-center items-center sm:flex-row bg-gray-300 h-screen">
      <InputSection />
      <Output />
    </div>
  );
};

export default Page;
