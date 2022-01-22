import {  useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./components/styles.css";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Register from "./pages/Register";

export type CartItemType = {
  _id: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number
};

function App() {

  const [cartItems, setCartItems] = useState([] as CartItemType[]);

  const removefromcart = (clickedItem: CartItemType) => {
    setCartItems(prev =>
      prev.reduce((ack, item) => {
        if (item._id === clickedItem._id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
    
  };


  const addtocart = (clickedItem: CartItemType) => {
    setCartItems((prev) => {
      const isItemInCart = prev.find(item => item._id === clickedItem._id);

      if (isItemInCart) {
        return prev.map(item =>
          item._id === clickedItem._id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      return [...cartItems, { ...clickedItem }];
    });
  };
  // console.log(cartItems)
  // console.log(process.env);



  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route
              path="/Product/:id"
              element={<Product addtocart={addtocart} />}
            ></Route>
            <Route path="/Login" element={<Login />}></Route>
            <Route path="/Register" element={<Register />}></Route>
            <Route
              path="/Cart"
              element={
                <Cart addtocart={addtocart} removefromcart={removefromcart} cartItems={cartItems} />
              }
            ></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;