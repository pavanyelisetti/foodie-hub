import React, { useEffect, useState } from 'react';
import './Order.css';
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from '../../assets/assets';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);  // State for orders

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + '/api/order/list');
      if (response.data.success) {
        setOrders(response.data.data);  // Correctly set orders
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

   const statusHandler = async(event,orderId)=>{
      const response = await axios.post(url+"/api/order/status",{
        orderId,status:event.target.value
      })
      if(response.data.success)
      {
        await fetchAllOrders();
      }
   }
  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className='order-list'>
        {
          orders.length > 0 ? (
            orders.map((order, index) => (
              <div key={index} className='order-item'>
                <img src={assets.parcel_icon} alt="" />
                <div>
                  <p className='order-item-food'>
                    {
                      order.items.map((item, idx) => (
                        idx === order.items.length - 1
                          ? `${item.name} x ${item.quantity}`
                          : `${item.name} x ${item.quantity}, `
                      ))
                    }
                  </p>
                  <p className='order-item-name'>
                    {order.address.firstName+" "+order.address.LastName}
                  </p>
                  <div className='order-item-address'>
                    <p>{order.address.street+","}</p>
                    <p>{order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.zipcode+","}</p>
                  </div>
                  <p className='order-item-phone'>{order.address.phone}</p>
                </div>
                <p>Items:{order.items.length}</p>
                <p>{order.amount}</p>
                <select  onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out For Delivery">Out For Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>   
            ))
          ) : (
            <p>No orders found.</p>  // Fallback if no orders exist
          )
        }
      </div>
    </div>
  );
}

export default Orders;
