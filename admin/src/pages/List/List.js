import React, { useEffect, useState } from 'react'
import './List.css'
import { toast } from 'react-toastify';
import axios from 'axios';
const List = () => {
  const url='http://localhost:4000'
  const [list,setList]=useState([]);
  const fetchList = async()=>{
    const response = await axios.get(`${url}/api/food/list`);
    
    if(response.data.success)
    {
      setList(response.data.data);
    }
    else{
      toast.error("Error");
    }
  }
  const remove = async(foodId)=>{
    const response = await axios.post(`${url}/api/food/remove`,{"id":foodId});
    console.log(foodId);
    if(response.data.success)
    {
      
      toast.success("Removed Successfully");
      await fetchList();
    }
    else{
      toast.error("Please try again");
    }

  }
  useEffect(()=>{
    fetchList();
  },[])
  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
            <p>Image</p>
            <p>Name</p>
            <p>Category</p>
            <p>Price</p>
            <p>Action</p>
        </div>
        {
          list.map((item,index)=>{
            return(
              <div key={index}className='list-table-format'>
                <img src={`${url}/images/`+item.image} alt=''/>
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>{item.price}</p>
                <img src='trash-solid.svg' onClick={()=>remove(item._id)} className='cursor' />
              </div>
            )
          })
        }
      </div>
      
    </div>
  )
}

export default List
