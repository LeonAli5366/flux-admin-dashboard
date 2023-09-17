import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";


const UpdateStory = () => {
  const navigate = useNavigate();
  const params = useParams();
  //All State
  const [title, setTitle] = useState("");
  const [photo, setPhoto] = useState("");
  const [details, setDetails] = useState("");
  const [id, setId] = useState("");

   //get single Story
   const getSingleStory = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/ourstory/single-story/${params.slug}`
      );
      setId(data.story._id);
      setTitle(data.story.title);
      setDetails(data.story.details);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleStory();
    // eslint-disable-next-line
  }, []);

  //Update story function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const storyData = new FormData();
      storyData.append("title", title);
      storyData.append("details", details);
      photo && storyData.append("photo", photo);
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/ourstory/update-story/${id}`,
        storyData
      );
      if (data?.success) {
        toast.success("Story Updated Successfully");
        navigate("/allstory");
      } else {
        toast.error("Not Working");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  //delete a story
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are You Sure want to delete this story ?");
      if (!answer) return;
      await axios.delete(
        `http://localhost:8080/api/v1/ourstory/delete-story/${id}`
      );
      toast.success("Story Deleted Succfully");
      navigate("/allstory");
      console.log("Story Deleted Succfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="container  text-black">
        <div className="row">
          <div className="col">
            <div className="card w-auto bg-[#141b2d] shadow-xl">
              <div className="card-body items-center text-center">
                <div className="text-5xl font-bold text-white pb-10">
                  Update story
                </div>
                <div className="m-1 w-75 flex gap-[100px]">
                  <div className="update-story-left">
                    <div className="mb-3">
                      {photo ? (
                        <div className="text-center">
                          <img
                            src={URL.createObjectURL(photo)}
                            alt=""
                            height={"500px"}
                            className="img img-responsive w-[700px] h-auto"
                          />
                        </div>
                      ) : (
                        <div className="text-center">
                          <img
                            src={`http://localhost:8080/api/v1/ourstory/story-photo/${id}`}
                            alt=""
                            height={"200px"}
                            className="img img-responsive w-[700px] h-auto"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="update-story-right flex flex-col justify-center gap-12">
                    {/* story name  */}
                    <div className="mb-3">
                      <input
                        type="text"
                        value={title}
                        placeholder="write a name"
                        className="form-control w-full h-[47px] text-center rounded font-medium text-[28px] mx-auto bg-base-200"
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>

                    {/* Price */}
                    <div className="mb-3">
                      <input
                        type="text"
                        value={details}
                        placeholder="write story"
                        className="form-control w-full h-[47px] text-center rounded font-medium text-[28px] mx-auto"
                        onChange={(e) => setDetails(e.target.value)}
                      />
                    </div>

                    {/* photo upload */}
                    <div className="mb-3">
                      <label className="btn btn-outline-secondary col-md-12 w-[310px]">
                        {photo ? photo.name : "Upload New Photo"}
                        <input
                          type="file"
                          name="photo"
                          accept="image/*"
                          onChange={(e) => setPhoto(e.target.files[0])}
                          hidden
                        />
                      </label>
                    </div>

                    <div className="mb-3">
                      <button
                        className="btn bg-green-600 mr-2 border-none font-bold"
                        onClick={handleUpdate}
                      >
                        UPDATE STORY
                      </button>
                      <button
                        className="btn bg-red-600 ml-2 border-none font-bold"
                        onClick={handleDelete}
                      >
                        DELETE STORY
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

export default UpdateStory
