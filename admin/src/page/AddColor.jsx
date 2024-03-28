import React, { useState } from 'react'
import CustomInput from '../components/CustomInput'
import { useLocation } from 'react-router-dom';


const AddColor = () => {
  const location = useLocation();
  const orginLabel = location.pathname.split('/')[3]
  const label = `${orginLabel[0].toUpperCase()}${orginLabel.slice(1 , orginLabel.length -1)}`
  return (
    <div className='w-100'>
      <h3 className="mb-4">Add {label}</h3>
      
      <div className="flex-grow">
      
        <form action="" className="w-100">
            
          <CustomInput id="title" label={"Enter Blog Title"} type={"text"} />
          
          <button className="add-blog-button">Add {label}</button>
        </form>
      </div>
    </div>
  );
}

export default AddColor