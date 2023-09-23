import React from 'react'

const ChangePass = () => {
  return (
    <div className="">
      <div className="flex flex-col items-center justify-center bordermx-auto rounded profile-wrapper gap-5 md:py-24 py-7 overflow-hidden md:max-w-[500px] mx-auto">
        <span className="md:text-2xl text-xl font-semibold text-[#4cceac]">
          Change Password
        </span>

        <form className="flex flex-col w-full items-center gap-5">
          
          <div className="flex flex-col md:w-full w-[270px]">
          <span className="pb-3">Password</span>
            <input
              type="password"
              name=""
              id=""
              placeholder="*******"
              disabled
              className="bg-white px-5 py-2 rounded"
            />
          </div>

          <div className="flex justify-end w-full md:ml-[50px]">
            <button className="btn btn-sm btn-success border-none md:w-[180px] mr-[25px]">
              Change password
            </button>
          </div>
        </form>
        
      </div>
    </div>
  )
}

export default ChangePass