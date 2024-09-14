import React, { useState ,useContext} from 'react'
import { assets } from '../../assets/assets'
import './Navbar.css'
import {Link, NavLink, useNavigate} from 'react-router-dom'
import { StoreContext } from '../../context/storeContext'
const Navbar = ({setShowLogin}) => {
    const [menu,setMenu] =useState("home");
    const{getTotalCartAmount,token,setToken}=useContext(StoreContext)
    const navigate = useNavigate();
    const logout=()=>{

        localStorage.removeItem("token");
        setToken("");
        navigate("/");
        window.location.reload(true);

    }
    const setMessage=()=>{
      alert("Login To check The Cart Details");
    }
  return (
    <div className='navbar'>
      <Link to="/"><h1 className='logo'>FoodieHub</h1></Link>
      <ul className='navbar-menu'>
        <Link  to='/' onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>Home</Link>
        <Link to='/menus' onClick={()=>setMenu("menu") }className={menu==="menu"?"active":""} >Menu</Link>
        <Link to="/myorders" onClick={()=>setMenu("orders")}  className={menu==="orders"?"active":""}>Orders</Link>
        <a href="#footer" onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>Contact us</a>
      </ul>
      <div className='navbar-right'>
        
        <div className='navbar-search-icon'>
            {!token?<img src={assets.basket_icon} onClick={()=>setMessage()} alt="" /> :<Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>}
            <div className={getTotalCartAmount()?"dot":""}></div>
        </div>
        {!token?<button onClick={()=>setShowLogin(true)}>Login</button>:
        <div className='navbar-profile'>
          <img src={assets.profile_icon} alt="" />
          <ul className="navbar-profile-dropdown">

            <li onClick={logout} ><img src={assets.logout_icon} alt="" />Logout</li>
          </ul>
          </div>}
        
      </div>
    </div>
  )
}

export default Navbar;
