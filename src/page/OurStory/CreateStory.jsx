import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CreateStory = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [photo, setPhoto] = useState("");
  const [details, setDetails] = useState("");

  //craete product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const storyData = new FormData();
      storyData.append("title", title);
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
                <div className="text-5xl font-bold text-[#4cceac] pb-11">
                  Create Stories
                </div>
                <div className="m-1 w-75 flex gap-[100px]">
                  <div className="create-product-left">
                    {/* photo upload */}
                    <div className="mb-3">
                      {photo && (
                        <div className="text-center">
                          <img
                            src={URL.createObjectURL(photo)}
                            alt=""
                            height={"200px"}
                            className="img img-responsive w-[700px] h-auto"
                          />
                        </div>
                      )}
                    </div>

                    {/* photo upload button*/}
                    <div className="mb-3">
                      <label className="btn btn-outline-secondary col-md-12 w-full mt-[60px]">
                        {photo ? photo.name : "Upload Photo"}
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
                  <div className="create-product-right flex flex-col  gap-5">
                    {/* Product name  */}
                    <div className="mb-3 items-center">
                      <input
                        type="text"
                        value={title}
                        placeholder="Story  Title"
                        className="form-control w-[300px] h-[40px] text-center rounded font-medium text-[28px] mx-auto"
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>

                    {/* Price */}
                    <div className="mb-3 mx-auto">
                      <input
                        type="text"
                        value={details}
                        placeholder="Story Details"
                        className="form-control w-[300px] h-[40px] text-center rounded font-medium text-[28px] mx-auto "
                        onChange={(e) => setDetails(e.target.value)}
                      />
                    </div>

                    <div className="mb-3">
                      <button
                        className="btn font-semibold bg-[#4cceac] border-none w-full"
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
  )
}

export default CreateStory
