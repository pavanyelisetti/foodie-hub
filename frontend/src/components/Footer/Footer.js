import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className='footer-content'>
        <div className='footer-content-left'>
            <h2>FoodieHub</h2>
            <p>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise.Our mission satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
            <div className='footer-social-icons'>
                <img src={assets.facebook_icon}></img>
                <img src={assets.twitter_icon}></img>
                <img src={assets.linkedin_icon}></img>
            </div>
        </div>
        <div className='footer-content-center'>
        <h2>Company</h2>
        <ul>
            <li>
                Home
            </li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
        </ul>
        </div>
        <div className='footer-content-right'>
        <h2>GET IN TOUCH</h2>
        <ul>
          <li>+91 8790875322</li>
          <li>foodiehub@gmail.com</li>
        </ul>
        </div>
      </div>
      <hr />
      <p className='footer-copyright'>
        Copyright @foodiehub.com -All Rights Reserved
      </p>
    </div>
  )
}

export default Footer
