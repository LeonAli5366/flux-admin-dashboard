import React, { useContext, useState } from "react";
import { AuthContext } from "../ContextApi/UserContex";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ChangeUserName = () => {
  const [name, setName] = useState("");
  const { updateUser } = useContext(AuthContext);
  const navegate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleUserUpdate = () => {
    const profile = {
      displayName: name,
    };
    updateUser(profile)
      .then(() => {
        toast.success("Admin name update successfully");
        setName("");
        navegate("/");
      })
      .catch((error) => {
        // An error occurred
        // ...
      });
  };
  return (
    <div className="">
      <div className="flex flex-col items-center justify-center bordermx-auto rounded profile-wrapper gap-5 md:py-24 py-7  overflow-hidden md:max-w-[500px] mx-auto">
        <span className="md:text-2xl text-xl font-semibold text-[#4cceac]">
          Update Admin name
        </span>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full items-center gap-5">
          {/* eamil */}
          <div className="flex flex-col md:w-full w-[270px]">
            <span className="pb-3">User Name</span>
            <input
              type="text"
              name=""
              id=""
              placeholder="User Name"
              className=" px-5 py-2 rounded text-black"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>

          <div className="flex justify-end w-full md:ml-[50px]">
            <button
              type="submit"
              onClick={handleUserUpdate}
              className="btn btn-sm btn-success border-none md:w-[180px] mr-[25px]">
              Update Admin Name
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangeUserName;
