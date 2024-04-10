import React from 'react'

const CustomInput = ({
    type,
    id,
    placeholder,
    onChange,
    onBlur,
    val,
    calssname,
    isDisabled
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
            disabled={isDisabled}
         />
    </div>
  )
}

export default CustomInput