import React, { useContext, useEffect, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/storeContext';
import axios from 'axios'
import { toast } from 'react-toastify'

const LoginPopup = ({setShowLogin}) => {
  const [currentState,setCurrentState]=useState("Login");
  const [data,setData]=useState({
    name:"",
    email:"",
    mobile:null,
    password:"",
    confirm_password:""
  })

  const onChangeHandler= async (event)=>{
    const name =event.target.name;
    const value=event.target.value;
    setData(data=>({...data,[name]:value}))
  }
 
  const {url,token,setToken}=useContext(StoreContext);
  const onLogin =async(event)=>{
    event.preventDefault();
    let newUrl = url;
    if(currentState==="Login")
    {
      newUrl+='/api/user/login';
    }
    else{
      newUrl+='/api/user/signup';
    }
    const response = await axios.post(newUrl,data);
    if(response.data.success)
    {
        toast.success(response.data.message);
        setToken(response.data.token);
        localStorage.setItem("token",response.data.token);
        setShowLogin(false);   
    }
    else{
      alert(response.data.message)
    }


  }

  return (
    <div className='login-popup'>
      <form className='login-popup-container' onSubmit={onLogin}>
        <div className='login-popup-title'>
          <h2>{currentState}</h2>
          <img onClick={()=>setShowLogin(false)} src={assets.cross_icon}></img>
        </div>
        <div className='login-popup-inputs'>
        
        {currentState==="Login"?<></>:<input type='text' name="name" onChange={onChangeHandler} value={data.name} placeholder='Your name' required/>
        }
        {currentState==="Login"?<></>:<input type='number' name="mobile" onChange={onChangeHandler} value={data.mobile}  placeholder='Your mobile number' required/>
        }
        
        
        <input name="email" onChange={onChangeHandler} value={data.email}  type='email' placeholder='Your email' required />
        <input name="password" onChange={onChangeHandler} value={data.password}  type='password' placeholder='password'required />
        {currentState==="Login"?<></>:<input type='password'name="confirm_password" onChange={onChangeHandler} value={data.confirm_password}  placeholder='confirm password' required/>
        }
        </div>
        <button type='submmit' >{currentState==="Sign Up"?"Create account":"Login"}</button>
        <div className='login-popup-condition'>
          <input type='checkbox' required />
          <p>By continuing ,i agree to the terms of use & privacy policy </p>
        </div>
        {
          currentState==="Login"?
          <p>Create a new account? <span onClick={()=>setCurrentState("Sign Up")} >Click here</span></p>:
          <p>Already have an account? <span onClick={()=>setCurrentState("Login")} >Click here</span></p>
        }
      </form>
    </div>
  )
}

export default LoginPopup
