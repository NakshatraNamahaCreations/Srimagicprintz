import React, { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Toaster() {
  const notify = () => toast("Wow so easy!");
  const [name, setName] = useState("");

  const [data, setData] = useState();

  const handledata = () => {
    notify();
    setData(name);
  };
  return (
    <div>
      {data}
      <form>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </form>
      <button onClick={handledata}>Add</button>
      <ToastContainer />
    </div>
  );
}
