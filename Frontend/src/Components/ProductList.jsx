// ProductList.js
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/productSlice";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../redux/cartSlice";

export default function ProductList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  const products = useSelector((state) => state.product.products);
  // console.log("Products:", products)

  const [viewMode, setViewMode] = useState("table");
  const [searchTerm, setSearchTerm] = useState("");

  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === "table" ? "grid" : "table"));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    async function fetchData() {
        // console.log("In use effect")
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        // console.log("Response:", response.data)
        dispatch(getProducts(response.data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const handleAddToCart = (id) => {
    // Dispatch the addToCart action to update Redux store
    dispatch(addToCart(id));
    console.log("Id:",id)

    // Make a POST request to add the product to the cart in the backend
    axios.post(`http://localhost:5000/api/cart/${id}`).then((response) => {
      console.log('Product added to cart');
    console.log('Updated Cart:', response.data.cart);
    });
  };

  return (
    <>
      <div>
        <button 
        type= "button"
        onClick={()=> navigate("/add")}
        >
            Add Product
        </button>
        <button 
        type= "button"
        onClick={()=> navigate("/cart")}
        >
            Check cart
        </button>
        <div>
          <button onClick={toggleViewMode}>
            {" "}
            {viewMode === "table"
              ? "Switch to Grid View"
              : "Switch to List View"}
          </button>

          <br />
          <input
            type="text"
            placeholder="Search by Name"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        {viewMode === "table" ? (
          <table className="table table-striped">
            <thead style={{ borderBottom: "2px solid orange" }}>
              <tr>
                <th className="px-5">Product</th>
                <th className="px-5">Price</th>
                <th className="px-5">Description</th>
                <th className="px-5"></th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => {
                return (
                  <tr key={product._id}>
                    <td className="px-5">{product.name}</td>
                    <td className="px-5">{product.price}</td>
                    <td className="px-5">{product.description}</td>
                    <td className="px-5"><button onClick={() => handleAddToCart(product._id)}>Add to Cart</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="grid-container">
            {filteredProducts.map((product) => (
              <div key={product._id} className="grid-item">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Product: {product.name}</h5>
                    <p className="card-text">Price: {product.price}</p>
                    <p className="card-text">
                      Description: {product.description}
                    </p>
                    <button onClick={() => handleAddToCart(product._id)}>Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
