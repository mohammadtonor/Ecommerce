import React from 'react'

const CustomInput = ({
    type,
    id,
    placeholder,
    onChange,
    onBlur,
    val,
    calssname
}) => {
  return (
    <div className="form-group">
        <input
            type={type}
            id={id}
            placeholder={placeholder}
            className={calssname}
            onChange={onChange}
            onBlur={onBlur}
            value={val}
         />
    </div>
  )
}

export default CustomInput