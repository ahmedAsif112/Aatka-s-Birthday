'use client';


import { redirect } from "next/navigation";

const SelectorWithApi = () => {
  return (
    <div >

      {redirect("/home")}
    </div>

  );
};

export default SelectorWithApi;
