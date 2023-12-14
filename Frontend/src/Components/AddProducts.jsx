import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/productSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddProducts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [product, setProduct] = useState({ name: "", price: 0, description: "" });

  function handleChange(evt) {
    setProduct({ ...product, [evt.target.name]: evt.target.value });
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const result = await axios.post("http://localhost:5000/api/products", product);
      dispatch(addProduct(result.data));
      navigate("/");
    } catch (error) {
      console.log("Error creating product:", error);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Add Product</h2>
        <div>
          <label htmlFor="name">Product</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter Name"
            onChange={handleChange}
            value={product.name}
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            id="price"
            name="price"
            type="number"
            placeholder="Enter Price"
            onChange={handleChange}
            value={product.price}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            id="description"
            name="description"
            type="text"
            placeholder="Enter Description"
            onChange={handleChange}
            value={product.description}
          />
        </div>
        <button className="btn btn-success">Submit</button>
      </form>
    </div>
  );
}
export default AddProducts;
