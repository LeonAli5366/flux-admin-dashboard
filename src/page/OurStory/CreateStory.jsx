import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CreateStory = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [photo, setPhoto] = useState("");
  const [details, setDetails] = useState("");
  //craete product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const storyData = new FormData();
      storyData.append("title", title);
      storyData.append("subtitle", subtitle);
      storyData.append("details", details);
      storyData.append("photo", photo);
      const { data } = axios.post(
        `http://localhost:8080/api/v1/ourstory/create-story`,
        storyData
      );
      if (data?.success) {
        toast.error(data?.message);
        console.log("error");
      } else {
        toast.success("Story Created Successfully");
        console.log("Story Created Successfully");
        navigate("/allstory");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <>
      <div className="container text-black">
        <div className="row">
          <div className="col">
            <div className="card w-auto  shadow-xl">
              <div className="card-body items-center text-center">
                <div className="md:text-5xl md:mt-[20px] md:font-bold text-[#4cceac] md:pb-11 text-2xl mr-[45px]">
                  Create Stories
                </div>
                <div className="m-1 w-75 md:flex md:gap-[80px]">
                  <div className="create-product-left">
                    {/* photo upload */}
                    <div className="md:mb-3">
                      {photo && (
                        <div className="text-center">
                          <img
                            src={URL.createObjectURL(photo)}
                            alt=""
                            height={"200px"}
                            className="img img-responsive md:w-[700px] md:h-[425px] w-[250px] h-[150px] object-cover"
                          />
                        </div>
                      )}
                    </div>
                    {/* photo upload button*/}
                    <div className="mb-3">
                      <label
                        className={`btn btn-outline-secondary col-md-12 md:w-[700px] md:h-[425px] w-[250px] h-[150px] mr-[50px] ${
                          photo ? "hidden" : ""
                        }`}
                      >
                        {photo ? photo.name : "Click to Upload Photo"}
                        <input
                          type="file"
                          name="photo"
                          accept="image/*"
                          onChange={(e) => setPhoto(e.target.files[0])}
                          hidden
                        />
                      </label>
                    </div>
                  </div>
                  <div className="create-product-right flex flex-col  gap-5 md:mt-[20px]">
                    {/* Product name  */}
                    <div className="md:mb-1">
                      <input
                        type="text"
                        value={title}
                        placeholder="Story  Title"
                        className="form-control md:w-[360px] md:h-[40px] text-center rounded md:font-medium md:text-[28px] mx-auto text-[18px] w-[250px] mr-[50px]"
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>

                    {/* Product subtitle  */}
                    <div className="md:mb-1">
                      <input
                        type="text"
                        value={subtitle}
                        placeholder="Story  Subtitle"
                        className="form-control md:w-[360px] md:h-[40px] text-center rounded md:font-medium md:text-[28px] mx-auto text-[18px] w-[250px] mr-[50px]"
                        onChange={(e) => setSubtitle(e.target.value)}
                      />
                    </div>

                    {/* Details */}
                    <div className="md:mb-3 mx-auto">
                      <textarea
                        rows="7"
                        value={details}
                        placeholder="Story Details"
                        className="form-control md:py-4 md:px-14 md:w-[360px] text-center rounded font-medium text-[18px] mx-auto mr-[50px] w-[250px]"
                        onChange={(e) => setDetails(e.target.value)}
                      />
                    </div>

                    {/* Change Photo */}
                    <div className={` ${photo ? "block" : "hidden"}`}>
                    <div className="md:mb-1">
                      <label
                        className={`btn btn-sm btn-outline-secondary col-md-12 md:w-[360px] w-[250px] mr-[50px]`}
                      >
                        {photo ? "Change Photo" : photo.name }
                        <input
                          type="file"
                          id='file-input'
                          title=''
                          name="photo"
                          accept="image/*"
                          onChange={(e) => setPhoto(e.target.files[0])}
                        />
                      </label>
                    </div>
                    </div>

                    <div className="mb-3">
                      <button
                        className="btn font-semibold bg-[#4cceac] border-none md:w-[360px] w-[250px] h-[30px] mr-[50px]"
                        onClick={handleCreate}
                      >
                        CREATE NEW STORY
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateStory;
