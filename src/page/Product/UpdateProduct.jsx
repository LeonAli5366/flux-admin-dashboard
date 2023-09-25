import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  //All State
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [price, setPrice] = useState("");
  const [id, setId] = useState("");
  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/single-product/${params.slug}`
      );
      setId(data.product._id);
      setName(data.product.name);
      setPrice(data.product.price);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    // eslint-disable-next-line
  }, []);

  //Update product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("price", price);
      photo && productData.append("photo", photo);
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.success("Product Updated Successfully");
        navigate("/");
      } else {
        toast.error("Not Working");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  //delete a product
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are You Sure want to delete this product ?");
      if (!answer) return;
      await axios.delete(
        `http://localhost:8080/api/v1/product/delete-product/${id}`
      );
      toast.success("Product Deleted Succfully");
      navigate("/");
      console.log("Product Deleted Succfully");
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
                <div className="text-white md:text-5xl md:font-bold  md:pb-10 pb-2 text-2xl">
                  Update Product
                </div>
                <div className="md:m-1 md:w-75 md:flex md:gap-[100px]">
                  <div className="update-product-left">
                    {/* img preview */}
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
                            src={`http://localhost:8080/api/v1/product/product-photo/${id}`}
                            alt=""
                            height={"200px"}
                            className="img img-responsive md:w-[700px] w-[300px] h-auto md:rounded-lg rounded pb-2"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="update-product-right flex flex-col justify-center md:gap-12 gap-2">
                    {/* Product name  */}
                    <div className="mb-3">
                      <input
                        type="text"
                        value={name}
                        placeholder="write a name"
                        className="form-control w-full md:h-[47px] text-center rounded font-medium md:text-[28px] mx-auto bg-base-200 text-[18px]"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    {/* Price */}
                    <div className="mb-3">
                      <input
                        type="number"
                        value={price}
                        placeholder="write a Price"
                        className="form-control w-full md:h-[47px] text-center rounded font-medium md:text-[28px] mx-auto text-[18px]"
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>

                    {/* photo upload */}
                    <div className="">
                      <label className="btn btn-outline-secondary col-md-12 text-[14px] w-full h-[40px]">
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

                    <div className="mb-3 text-center flex gap-2 m-[22px]">
                      <button
                        className="btn bg-green-600 md:mr-2 border-none font-bold w-[100px]"
                        onClick={handleUpdate}
                      >
                        UPDATE PRODUCT
                      </button>
                      <button
                        className="btn bg-red-600 ml-2 border-none font-bold w-[100px]"
                        onClick={handleDelete}
                      >
                        DELETE PRODUCT
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

export default UpdateProduct;
