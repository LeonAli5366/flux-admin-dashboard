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
            <div className="text-center text-2xl py-2 md:text-4xl md:font-bold md:py-5">
              All Story List
            </div>
            <div className="flex flex-wrap md:ml-[70px] pl-[17px] md:flex md:gap-10 md:justify-evenly">
              {story?.map((s) => (
                  <Link key={s._id} to={`/UpdateStory/${s.slug}`}>
                <div className="div">
                    <div className="card-body">
                    <img
                      src={`http://localhost:8080/api/v1/ourstory/story-photo/${s._id}`}
                      className="card-img-top w-[270px] h-[150px] object-cover md:w-[350px] md:h-[220px]"
                      alt="s.name"
                    />
                      <h5 className="card-title">{s.title}</h5>
                      <p className="card-text font-medium md:text-lg md:w-[350px]">{s.details.slice(0,100)}...</p>
                      <p className="card-text md:font-medium md:text-2xl">{s.subtitle}</p>
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
