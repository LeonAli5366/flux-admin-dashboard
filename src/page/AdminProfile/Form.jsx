import React, { useContext } from "react";
import { AuthContext } from "../ContextApi/UserContex";

const Form = () => {
  const { user, logOut,  } = useContext(AuthContext);
  console.log(user)

  const handleLogOut = () => {
    logOut()
      .then(() => {
        console.log("log out success full");
        
      })
      .error((error) => {
        console.log(error);
      });
  };
  return (
    <div className="">
      <div className="flex flex-col items-center justify-center bordermx-auto rounded profile-wrapper gap-5 md:py-20 py-7 overflow-hidden md:max-w-[500px] mx-auto">
        {/* profile image */}
        <div className="w-48 rounded-full bg-white overflow-hidden">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="default profile"
            className="md:w-full"
          />
        </div>

        <span className="text-lg font-semibold text-[#4cceac]">
          Admin Profile
        </span>

        <form className="flex flex-col md:w-full items-center gap-5">
          <div className="flex flex-col w-full">
            <div className="text-black bg-white p-4 rounded font-semibold">
              {user?.displayName}
            </div>
          </div>

          {/* eamil */}

          <div className="flex flex-col w-full">
            <div className="text-black bg-white p-4 rounded font-semibold">
              {user?.email}
            </div>
          </div>

          <div className="flex justify-end w-full">
            <button
              onClick={handleLogOut}
              className="btn btn-sm bg-red-700 border-none w-[150px]">
              logout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
