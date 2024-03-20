import React from 'react'
import Marquee from 'react-fast-marquee';
const HomeMarquee = () => {
  return (
    <div className='container-xxl'>
        <div className='row'>
            <div className='col-12'>
                <div className='marquee-inner-wrapper card-wrapper'>
                    <Marquee className='marquee'>
                        <div>
                            <img src="/images/Lenovo.png" alt="brand" />
                        </div>
                        <div>
                            <img  src="/images/amazon.png" alt="brand" />
                        </div>
                        <div>
                            <img src="/images/adidas.png" alt="brand" />
                        </div>
                        <div>
                            <img src="/images/Samsung.png" alt="brand" />
                        </div>
                        <div>
                            <img src="/images/LG.jfif" alt="brand" />
                        </div>
                        <div>
                            <img src="/images/Huavi.png" alt="brand" />
                        </div>
                        <div>
                            <img src="/images/Samsung.png" alt="brand" />
                        </div>
                        <div>
                            <img src="/images/Samsung.png" alt="brand" />
                        </div>
                    </Marquee>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HomeMarquee