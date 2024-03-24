import React from 'react'

const PolicyCard = ({items}) => {
  return (
    <div className="policy-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
            <div className="policy-card">
                {items && items.map((item, index) => (
                    <div key={index} className="policy-card-item">
                        <h2>{item.title}</h2>
                        <p>{item.content}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default PolicyCard