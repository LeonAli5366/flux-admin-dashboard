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
        navigate("/allproduct");
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
                  Create Product
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
                        value={name}
                        placeholder="Product name"
                        className="form-control w-[300px] h-[40px] text-center rounded font-medium text-[28px] mx-auto"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    {/* Price */}
                    <div className="mb-3 mx-auto">
                      <input
                        type="number"
                        value={price}
                        placeholder="Product Price"
                        className="form-control w-[300px] h-[40px] text-center rounded font-medium text-[28px] mx-auto "
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>

                    <div className="mb-3">
                      <button
                        className="btn font-semibold bg-[#4cceac] border-none w-full"
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
