import './product.scss'
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [price, setPrice] = useState("");

  //craete product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("price", price);
      productData.append("photo", photo);
      const { data } = axios.post(
        `http://localhost:8080/api/v1/product/create-product`,
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
        console.log("error");
      } else {
        toast.success("Product Created Successfully");
        console.log("Product Created Successfully");
        navigate("/");
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
                <div className="md:text-5xl md:font-bold md:mt-[20px] text-[#4cceac] md:pb-11 text-2xl mr-[45px]">
                  Create Product
                </div>
                <div className="m-1 w-75 md:flex md:gap-[100px] ">
                  <div className="create-story-left">
                    {/* photo upload */}
                    <div className="md:mb-3">
                      {photo && (
                        <div className="text-center">
                          <img
                            src={URL.createObjectURL(photo)}
                            alt=""
                            height={"200px"}
                            className="img img-responsive w-[250px] h-[150px] md:w-[700px] md:h-[425px] object-cover"
                          />
                        </div>
                      )}
                    </div>

                    {/* photo upload button*/}
                    <div className="mb-3 ">
                      <label
                        className={`btn btn-outline-secondary col-md-12 w-[250px] h-[150px] md:w-[700px] md:h-[425px]  mr-[50px] ${
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
                          required
                        />
                      </label>
                    </div>
                  </div>
                  <div className="create-product-right flex flex-col  gap-5 md:mt-[80px]">
                    {/* Product name  */}
                    <div className="md:mb-3">
                      <input
                        type="text"
                        value={name}
                        placeholder="Product name"
                        className="form-control md:w-[360px] md:h-[40px] text-center rounded md:font-medium md:text-[28px] mx-auto text-[18px] w-[250px] mr-[50px]"
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>

                    {/* Price */}
                    <div className="md:mb-3  mx-auto">
                      <input
                        type="number"
                        value={price}
                        placeholder="Product Price"
                        className="form-control md:w-[360px] md:h-[40px] text-center rounded md:font-medium md:text-[28px] mx-auto text-[18px] w-[250px] mr-[50px]"
                        onChange={(e) => setPrice(e.target.value)}
                        required
                      />
                    </div>
                    {/* Change Photo */}
                    <div className={` ${photo ? "block" : "hidden"}`}>
                    <div className="md:mb-2">
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
                        CREATE PRODUCT
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

export default CreateProduct;
