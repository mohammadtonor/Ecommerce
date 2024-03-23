import { Link, NavLink } from "react-router-dom"
import { BsSearch  } from 'react-icons/bs'
import { IoGitCompareOutline } from "react-icons/io5";
import { MdFavoriteBorder   } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { SlBasket } from "react-icons/sl";
import { CgMenuGridO } from "react-icons/cg";

const Header = () => {
  return (
    <>
      <header className="header-top-strip py-3 pb-0">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <p>Free Shipping over $100 & free Returns</p>
            </div>
            <div className="col-6">
              <p className="text-end">
                HotLine: <a href="tel:+98 9173623354">+98 917 362 3364</a>
              </p>
              
            </div>
          </div>
        </div>
      </header>
      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-2">
              <h1>
                <Link to={'/'}>
                  DigiTech
                </Link>
              </h1>
            </div>
            <div className="col-5">
              <div class="input-group">
                  <input 
                    type="text" 
                    class="form-control" 
                    placeholder="Search product Here..." 
                    aria-label="Search product Here..."
                  />
                  <span class="input-group-text" id="basic-addon2">
                    <BsSearch className="fs-6"/>
                  </span>
                </div>
            </div>
            <div className="col-5 mt-2">
              <div className="header-upper-links d-flex align-item-center justify-content-between">
                <div>
                  <Link to={'/cart'} className="d-flex">
                    <IoGitCompareOutline className="fs-3 mt-1"/>
                    <p>Compare <br /> Products</p>
                  </Link>
                </div>
                <div>
                  <Link to={'/cart'} className="d-flex">
                    <MdFavoriteBorder   className="fs-3 mt-1"/>
                    <p>Favorite <br /> Wishlist</p>
                  </Link>
                </div>
                <div>
                  <Link to={'/cart'} className="d-flex">
                    <FaRegUser  className="fs-3 mt-1"/>
                    <p>User <br /> Profile</p>
                  </Link>
                </div>
                <div>
                  <Link to={'/cart'} className="d-flex text-white">
                    <SlBasket className="fs-3 mt-1" />
                      <div className="header-upper-links-basket">
                        <span className="badge bg-white text-dark">0</span>
                        <span className="fs4">$500</span>
                      </div>                   
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-button d-flex align-items-center gap-4">
                <div>
                  <div class="dropdown">
                      <button
                        class="btn btn-secondary dropdown-toggle bg-transparent
                             border-0 text-white d-flex align-items-center gap-2"
                        type="button" 
                        id="dropdownMenuButton1" 
                        data-bs-toggle="dropdown" 
                        aria-expanded="false"
                      >
                        <CgMenuGridO className="fs-3"/>
                        <span>Shop Categories</span>
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                      <li>
                        <Link className="dropdown-item" to="#">Action</Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="#">Another action</Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="#">Something else here</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="menu-links">
                  <div className="d-flex align-item-center gap-4">
                    <NavLink className='' to={'/'} >Home</NavLink>
                    <NavLink className='' to={'/store'} >Our Store</NavLink>
                    <NavLink className='' to={'/blogs'} >Blogs</NavLink>
                    <NavLink className='' to={'/about'} >About</NavLink>
                    <NavLink className='' to={'/contact'} >Contact</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header