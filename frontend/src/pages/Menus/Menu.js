import React, { useState } from 'react'
import './Menu.css'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
const Menu = () => {
    const [category,setCategory]=useState("All");
  return (
    <div>
    <div className='menus' >
      <hr />
      </div>
      <ExploreMenu  category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
    </div>
  )
}

export default Menu
