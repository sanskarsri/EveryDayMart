import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import  { Navigate  } from 'react-router-dom'
import React , {useState, useEffect} from 'react';
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Inventory from "./components/Inventory";
import Footer from "./components/Footer";
import './index.css';

function App() {
  
  const [cart, setCart] = useState([]);
  const [products,setproducts] = useState([]);
 
  const handleAddtocart = (item) => {

    var i;
    for (i = 0; i < cart.length; i++) {
        if (cart[i].serial === item.serial) {
            return ;
        }
    }

    setCart([...cart, item]);
  };

  useEffect(()=>{
    console.log(cart);
  },[cart])


  return (
    <>
    <Router>
        <Navbar cart={cart} setCart={setCart}  products={products} />
        <Routes>
              <Route
                exact
                path="/"
                element={
                  <>
                  <Home handleAddtocart={handleAddtocart} products={products} setproducts={setproducts} />
                  </>
                }
              />
              <Route
                exact
                path="/inventory"
                element={
                  <>
                  <Inventory />
                  </>
                }
              />
              <Route
                exact
                path="*"
                element={
                  <Navigate  to="/" />
                }
              />
        </Routes>
        <Footer />
    </Router>
    </>
  );
}

export default App;
