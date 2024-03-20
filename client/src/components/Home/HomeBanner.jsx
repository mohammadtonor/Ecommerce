import { Link } from "react-router-dom"

const HomeBanner = () => {
  return (
    <div className="container-xxl">
        <div className='row home-banner'>
            <div className='col-6'>
                <div className='main-banner position-relative '>
                    <img alt='banner' src='/images/banner3.jpg' />
                    <div className='main-banner-content position-absolute translate-middle'>
                        <h4>Super charched for pros</h4>
                        <h5>Ipad 13 pro.</h5>
                        <p>from $999.00 or $41/month</p>
                        <Link className='btn'>Buy Now</Link>
                    </div>
                </div>
            </div>
            <div className="col-6">
                <div className='d-flex  gap-1 align-items-center flex-wrapp'>
                    <div className='small-banner position-relative'>
                        <img alt='banner' src='/images/banner4.jpg'/>
                        <div className='small-banner-content position-absolute translate-middle'>
                            <h4>Super charched for pros</h4>
                            <h5>Ipad 13 pro.</h5>
                        </div>
                    </div>
                    <div className='small-banner position-relative'>
                        <img alt='banner' src='/images/banner4.jpg'/>
                        <div className='small-banner-content position-absolute translate-middle'>
                            <h4>Super charched for pros</h4>
                            <h5>Ipad 13 pro.</h5>
                        </div>
                    </div>
                    
                </div>
                <div className='d-flex gap-1 mt-1 align-items-center flex-wrapp'>
                    <div className='small-banner position-relative'>
                        <img alt='banner' src='/images/banner4.jpg'/>
                        <div className='small-banner-content position-absolute translate-middle'>
                            <h4>Super charched for pros</h4>
                            <h5>Ipad 13 pro.</h5>
                        </div>
                    </div>
                    <div className='small-banner position-relative'>
                        <img alt='banner' src='/images/banner4.jpg'/>
                        <div className='small-banner-content position-absolute translate-middle'>
                            <h4>Super charched for pros</h4>
                            <h5>Ipad 13 pro.</h5>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default HomeBanner