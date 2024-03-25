import React from 'react'
import Container from './Container';

const PolicyCard = ({items}) => {
  return (
    <Container class1="policy-wrapper home-wrapper-2 py-5">
        <div className="policy-card">
            {items && items.map((item, index) => (
                <div key={index} className="policy-card-item">
                    <h2>{item.title}</h2>
                    <p>{item.content}</p>
                </div>
            ))}
        </div>
    </Container>
  )
}

export default PolicyCard