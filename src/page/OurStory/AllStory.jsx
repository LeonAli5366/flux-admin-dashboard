import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const AllStory = () => {
    const [story, setStory] = useState([]);
    //get all product
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/ourstory/get-story`
      );
      setStory(data.story);
    } catch (error) {
      console.log(error);
      toast.error("Somthing Went Wrong");
    }
  }; //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <>
      <div className="container text-stone-200">
        <div className="row">
          <div className="col">
            <div className="text-center text-4xl font-bold py-10">
              All Story List
            </div>
            <div className="flex flex-wrap ml-[70px]">
              {story?.map((s) => (
                  <Link key={s._id} to={`/UpdateStory/${s.slug}`}>
                <div className="div">
                    <div className="card-body">
                    <img
                      src={`http://localhost:8080/api/v1/ourstory/story-photo/${s._id}`}
                      className="card-img-top w-[350px] h-[220px] object-cover"
                      alt="s.name"
                    />
                      <h5 className="card-title">{s.title}</h5>
                      <p className="card-text font-medium text-lg">{s.details}$</p>
                      <p className="card-text font-medium text-sm">Create : {s.createdAt}</p>
                      <p className="card-text font-medium text-sm">Update : {s.updatedAt}</p>
                    </div>
                </div>
                </Link>
              ) )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AllStory
