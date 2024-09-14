import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Cart from './pages/Cart/Cart';
import Home from './pages/Home/Home';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import { useState } from 'react';
import LoginPopup from './components/LoginPopup/LoginPopup';
import FoodItem from './components/FoodItem/FoodItem';
import FoodDisplay from './components/FoodDisplay/FoodDisplay';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyOrders from './pages/MyOrders/MyOrders';
import Menu from './pages/Menus/Menu';



function App() {
  const[showLogin,setShowLogin]=useState(false);
  const [category,setCategory]=useState("All");
  return (
    <>
    <ToastContainer />
    {showLogin? <LoginPopup setShowLogin={setShowLogin} /> :<></>}
    <div className="app"> 
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<PlaceOrder />} />
        <Route path="/menus" element={<Menu />}/>
        <Route path="/footer" element={<Footer/>}/>
        <Route path="/fooddisplay" element={<FoodDisplay />} />
        <Route path="/myorders" element={<MyOrders     />} />
      </Routes>
    </div>
    <Footer />
    </>
  )
}

export default App;
