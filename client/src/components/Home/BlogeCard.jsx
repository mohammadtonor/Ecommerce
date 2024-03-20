import React from 'react'
import { Link } from 'react-router-dom'

const BlogeCard = () => {
  return (
        <div className="blog-card">
            <div className="card-image">
                <img src="/images/blog.avif" alt="blog" />
            </div>
            <div className="blog-card-content">
                <p className='date'>! Dec 2023</p>
                <h5 className='title'>Blog Title</h5>
                <p className='desc'>Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet </p>
                <Link to=''>Read More</Link>
            </div>
        </div>

  )
}

export default BlogeCard