import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/storeContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
const PlaceOrder = () => {
  const {getTotalCartAmount,token,food_list,cartItems,url}=useContext(StoreContext)
  const navigate =useNavigate();
  const [data,setData]= useState({
    firstName:"",
    LastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:"",
  })
  useEffect(()=>{
    if(!token){
      navigate('/cart');
    }
    else if(getTotalCartAmount()==0)
    {
      navigate('/cart')
    }
  },[token])
  const onChangeHandler = (event) =>{
    const name=event.target.name;
    const value=event.target.value;
    setData((data)=>({...data,[name]:value}))
  }
  const placeOrder = async(event)=>{
    event.preventDefault();
    let orderItems=[];
    food_list.map((item)=>{
        if(cartItems[item._id]>0)
        {
          let itemInfo=item;
          itemInfo["quantity"]=cartItems[item._id];
          orderItems.push(itemInfo);
        }
    })
    let orderData={
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+50
    }
    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}});
    if(response.data.success)
    {
      toast.success("Order Placed SuccessFully");
      navigate("/");
      window.location.reload(true);
    }
    else{
      toast.error("Order Failed");
    }

  }
 
  return (
    <form className='place-order' onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className='multi-fields'>
          <input required type="text" placeholder='First Name' name="firstName" value={data.firstName} onChange={onChangeHandler} />
          <input required type="text" placeholder='Last Name'name="LastName" value={data.LastName} onChange={onChangeHandler} />
        </div>
        <input  required  type="email"  placeholder='Email'name="email" value={data.email} onChange={onChangeHandler}/>
        <input  required type="text" placeholder='Street' name="street" value={data.street} onChange={onChangeHandler}/>
        <div className='multi-fields'>
          <input  required type="text" placeholder='City'name="city" value={data.city} onChange={onChangeHandler}/>
          <input required type="text" placeholder='State'name="state" value={data.state} onChange={onChangeHandler} />
        </div>
        <div className='multi-fields'>
          <input required type="text" placeholder='Zip code'name="zipcode" value={data.zipcode} onChange={onChangeHandler}/>
          <input required type="text" placeholder='Country' name="country" value={data.country} onChange={onChangeHandler}/>
        </div>
      <input  required type='text' placeholder='phone'name="phone" value={data.phone} onChange={onChangeHandler} />
      </div>
      <div className="place-order-right">
      <div className='cart-total'>
          <h2>Cart Total</h2>
          <div>
          <div className='cart-total-details'>
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr/>
            <div className='cart-total-details'>
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount()?50:0}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <b>Total</b>
              <b>₹{getTotalCartAmount()?getTotalCartAmount()+50:0}</b>
            </div>
          </div>
          <button type="submit" >Place Order</button>
        </div>
        </div>
    </form>
  )
}

export default PlaceOrder;
