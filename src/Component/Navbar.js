import React from 'react'
import { Link, useLocation, useHistory } from "react-router-dom";
import Login from './Login';
import Signup from './Signup';
import { GoogleLogout } from 'react-google-login';


export default function Navbar(props) {
    const clientId = '694266012493-jstha1pctnlg7u5a2osna8vq4rd9fhta.apps.googleusercontent.com';
    const location = useLocation();
    let history = useHistory();
 
    const logoutNow = () => {
        console.log('logout are now here.');
        localStorage.removeItem('token');
        history.push('/');
        props.showAlert('Your are Logout successfully', 'success');
    }
    const logout = () => {
        console.log("that are click.");
        localStorage.removeItem('token');
        history.push('/');
        props.showAlert('Your are Logout successfully', 'success');
    }
    const clickpro = ()=>{
        props.setProgress(10);
        props.setProgress(50);
        props.setProgress(100);
    }
    return (
        <>
        
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Sitename</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link onClick={clickpro} className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link onClick={clickpro} className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about">About</Link>
                            </li>

                            <li className="nav-item">
                                <Link onClick={clickpro} className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`} to="/contact">Contact</Link>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" >Search</button>
                        </form>
                        {!localStorage.getItem('token') ? <>
                            <button className="btn btn-outline-success mx-2" data-bs-toggle="modal" data-bs-target="#loginModal" type="submit">Login</button>
                            <button className="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#signupModal" type="submit">Signup</button>
                        </> : <>
                            <button className="btn btn-outline-success mx-2" onClick={logout}>Logout</button>
                            <GoogleLogout clientId={clientId} buttonText="Logout" onLogoutSuccess={logoutNow} />
                        </>}
                    </div>
                </div>
            </nav>

            <Login showAlert={props.showAlert} />
            <Signup showAlert={props.showAlert} />
        </>
    )
}
