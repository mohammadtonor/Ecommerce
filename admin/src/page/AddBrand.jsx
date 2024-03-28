import React, { useState } from 'react'
import CustomInput from '../components/CustomInput'


const AddBrand = () => {
  const [desc, setDesc] = useState("");
  const handleDesc = (e) => {
    setDesc(e)
  }

  return (
    <div className='w-100'>
      <h3 className="mb-4">Add Brand</h3>
      
      <div className="flex-grow">
      
        <form action="" className="w-100">
            
          <CustomInput id="title" label={"Enter Blog Title"} type={"text"} />
          
          <button className="add-blog-button">Add Brand </button>
        </form>
      </div>
    </div>
  );
}

export default AddBrand