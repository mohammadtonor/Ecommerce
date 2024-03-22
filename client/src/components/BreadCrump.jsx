import { Link } from 'react-router-dom'

const BrasdCrump = ({title}) => {
  return (
    <div className='breadCrump py-4'>
        <div className="container-xxl">
            <div className='header'>
                <div className='header-item'>
                    <span>
                        <Link to='/'>Home &nbsp; / &nbsp; {title}
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default BrasdCrump