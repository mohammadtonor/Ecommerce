
import { services } from "../../utils/data";
const HomeServices = () => {
  return (
            <div className='row'>
                <div className='col-12'>
                    <div className='home-service'>
                        {services.map((service) => (
                            <div className="home-service-item"key={service.id}>
                                {service.icon}
                                <div>
                                    <h6>{service.title}</h6>
                                    <p>{service.desc}</p>
                                </div>
                            </div>
                        ))}
                        
                    </div>
                </div>
            </div>
  )
}

export default HomeServices