import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const AllProduct = () => {
    const [products, setProducts] = useState([]);
      //get all product
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/get-product`
      );
      setProducts(data.products);
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
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="text-center text-2xl py-2 md:text-4xl md:font-bold md:py-5">
              All Product List
            </div>
            <div className="flex flex-wrap md:ml-[70px] pl-[17px] md:flex md:justify-around">
              {products?.map((p) => (
                <Link key={p._id} to={`/updateproduct/${p.slug}`}>
                  <div className="card m-2" >
                    <img
                      src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top w-[270px] h-[150px] object-cover md:w-[430px] md:h-[250px] md:object-cover"
                      alt="p.name"
                    />

                    <div className="card-body">
                      <h5 className="card-title ">{p.name}</h5>
                      <p className="card-text font-medium md:text-lg">Price : {p.price}$</p>
                      <p className="card-text font-medium md:text-sm">Create : {p.createdAt}</p>
                      <p className="card-text font-medium md:text-sm">Update : {p.updatedAt}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AllProduct
