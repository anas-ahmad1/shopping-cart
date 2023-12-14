// App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './Components/ProductList';
import AddProducts from './Components/AddProducts';
import ShoppingCart from './Components/ShoppingCart'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList/>} />
        <Route path="/add" element={<AddProducts/>} />
        <Route path="/cart" element={<ShoppingCart/>} />
      </Routes>
    </Router>
  );
};

export default App;
