import React from 'react'
import { Link } from 'react-router-dom'
import {format} from 'date-fns';

const BlogeCard = ({item}) => {
  return (
        <div className="blog-card">
            <div className="card-image">
                <img src={item?.images[0]?.url} alt="blog" />
            </div>
            <div className="blog-card-content">
                <p className='date'>{format(item?.createdAt, "dd MMM yyyy")}</p>
                <h5 className='title'>{item?.title}</h5>
                <p className='desc' 
                    dangerouslySetInnerHTML={{__html:  item?.description}}
                ></p>
                <Link to={`/blogs/${item?._id}`}>Read More</Link>
            </div>
        </div>

  )
}

export default BlogeCard