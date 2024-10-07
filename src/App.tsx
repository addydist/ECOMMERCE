import ProductList from "./components/ProductList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Checkout from "./components/Checkout";
import ProductPreview from './components/ProductPreview';
import { CartProvider } from "./context/CartContext";
import Categories from "./components/Categoires";
import AddProduct from "./components/AddProduct";
import NewProduct from "./components/NewProduct";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductPreview />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/add-product" element={<AddProduct/>}/>
          <Route path="/search" element={<ProductList />} />
          <Route path="/new-product/:id" element={<NewProduct/>}/>
       </Routes>
      </Router>
    </CartProvider>
 
  );
}

export default App;
