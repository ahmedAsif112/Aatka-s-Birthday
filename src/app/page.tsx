'use client';


import { redirect } from "next/navigation";

const SelectorWithApi = () => {
  return (
    <div className="main-container">
      <div className="container">
        {redirect("/weightloss")}
      </div>
    </div>
  );
};

export default SelectorWithApi;
