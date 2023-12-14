// ProductList.js
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getItems } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";

export default function ProductList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

  const [viewMode, setViewMode] = useState("table");
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState([]);

  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === "table" ? "grid" : "table"));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    async function fetchData() {
        console.log("In cart use effect")
      try {
        const response = await axios.get("http://localhost:5000/api/cart");
        // console.log("Response:", response.data)
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <div>
        {/* <button 
        type= "button"
        onClick={()=> navigate("/add")}
        >
            Add Product
        </button> */}
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
              {filteredItems.map((item) => {
                return (
                  <tr key={item._id}>
                    <td className="px-5">{item.name}</td>
                    <td className="px-5">{item.price}</td>
                    <td className="px-5">{item.description}</td>
                    <td className="px-5">{item.description}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="grid-container">
            {filteredItems.map((item) => (
              <div key={item._id} className="grid-item">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Product: {item.name}</h5>
                    <p className="card-text">Price: {item.price}</p>
                    <p className="card-text">
                      Description: {item.description}
                    </p>
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
