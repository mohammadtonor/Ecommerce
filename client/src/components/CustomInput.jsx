import React from 'react'

const CustomInput = ({
    type,
    id,
    placeholder,
    calssname
}) => {
  return (
    <div className="form-group">
        <input
            type={type}
            id={id}
            placeholder={placeholder}
            className={calssname}
         />
    </div>
  )
}

export default CustomInput