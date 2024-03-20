import React from 'react'
import { Link } from 'react-router-dom'

const HomeCategories = () => {
  return (
    <div className='container'>
        <div className="container-xxl">
            <div className="row">
                <div className="col-12">
                    <div className="home-categories">
                        <div className="home-categories-item">
                            <Link to='/categories'>
                                <div>
                                    <h6>Laptop</h6>
                                    <p>Best laptop for sell</p>
                                </div>
                                <img alt='cat' src='/images/laptop01.jfif'/>
                            </Link>
                        </div>
                        <div className="home-categories-item">
                            <Link to='/categories'>
                                <div>
                                    <h6>Mobile</h6>
                                    <p>Best Mobile for sell</p>
                                </div>
                                <img alt='category' src='/images/mobile.jfif'/>
                            </Link>
                        </div>
                        <div className="home-categories-item">
                            <Link to='/categories'>
                                <div>
                                    <h6>Camera</h6>
                                    <p>Best Camera for sell</p>
                                </div>
                                <img alt='category' src='/images/camera.jfif'/>
                            </Link>
                        </div>
                        <div className="home-categories-item">
                            <Link to='/categories'>
                                <div>
                                    <h6>Laptop</h6>
                                    <p>Best laptop for sell</p>
                                </div>
                                <img alt='category' src='/images/smart-tv.jpg'/>
                            </Link>
                        </div>
                        <div className="home-categories-item">
                            <Link to='/categories'>
                                <div>
                                    <h6>Laptop</h6>
                                    <p>Best laptop for sell</p>
                                </div>
                                <img alt='category' src='/images/headphone.jfif'/>
                            </Link>
                        </div>
                        <div className="home-categories-item">
                            <Link to='/categories'>
                                <div>
                                    <h6>Mobile</h6>
                                    <p>Best Mobile for sell</p>
                                </div>
                                <img alt='category' src='/images/mobile.jfif'/>
                            </Link>
                        </div>
                        <div className="home-categories-item">
                            <Link to='/categories'>
                                <div>
                                    <h6>Camera</h6>
                                    <p>Best Camera for sell</p>
                                </div>
                                <img alt='category' src='/images/camera.jfif'/>
                            </Link>
                        </div>
                        <div className="home-categories-item">
                            <Link to='/categories'>
                                <div>
                                    <h6>Laptop</h6>
                                    <p>Best laptop for sell</p>
                                </div>
                                <img alt='category' src='/images/smart-tv.jpg'/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HomeCategories