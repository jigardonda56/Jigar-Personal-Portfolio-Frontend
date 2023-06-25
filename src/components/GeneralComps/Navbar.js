import React from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom"
import '../../css/NavBar.css'
import mailIcon from "../../images/message.png"

const Navbar = () => {

    //to set navigation var linkes active light dark
    let location = useLocation();
    let navigate = useNavigate();

    const logoutClick = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        navigate("/profile");
    }

    return (
        <nav className="navbar navbar-expand-lg bg-light">

            <div className="container-fluid">

                <div className='navbar-title'>
                    <Link className="navbar-brand navbar-title-link" to="/">Jigar Donda</Link>
                </div>

                <ul className="navbar-nav me-auto mb-2 mb-lg-0 navbar-ul">
                    {/* nav items */}
                    {/* <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/profile" ? "active" : ""}`} to="/profile">Profile</Link>
                        </li>

                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/admin" ? "active" : ""}`} to="/admin">Admin</Link>
                        </li>*/}


                    {localStorage.getItem('token') ? <li className="nav-item">
                        <Link className={`nav-link ${location.pathname === "/admin" ? "active" : ""}`} to="/admin">Edit Profile</Link>
                    </li>
                        :
                        <></>
                    }
                </ul>
                <div className='email-div'>
                    <a href="mailto:jigar.donda56@gmail.com"><img src={mailIcon} alt="" /> <span className="email-span"> jigar.donda56@gmail.com</span></a>
                </div>

                {localStorage.getItem('token') ? <form className="d-flex" role="search">
                    <button className='btn btn-primary mx-3' onClick={logoutClick}>Logout</button> </form>
                    :
                    <></>
                }

            </div>
        </nav >
    )
}

export default Navbar
