import React, { useContext, useEffect, useState } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/storeContext'

const FoodItem = ({id,name,price,description,image}) => {
    
  const {cartItems,addToCart,removeFromCart,url}=useContext(StoreContext); 
  return (
    
    <div className='food-item'>
   
      <div className='food-item-img-container'>
        <img src={url+"/images/"+image} className='food-item-img' />
        { !cartItems[id]?<img className='add'onClick={()=>addToCart(id)} src={assets.add_icon_white} ></img>:<div className='food-item-container'>
            <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red}  />
            <p>{cartItems[id]}</p>
            <img  onClick={()=>addToCart(id)} src={assets.add_icon_green} alt=""/>
            </div>}
      </div>
      <div className='food-item-info'>
        <div className='food-item-name-rating'>
            <p>{name}</p>
            <img src={assets.rating_starts} alt=" "/>
        </div>
        <div>
            <p className='food-item-desc'>
                {description}
            </p>
            <p className='food-item-price'>₹{price}</p>
        </div>
      </div>
    </div>
  )
}

export default FoodItem
