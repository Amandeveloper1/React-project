import React, { useState } from 'react'
import ReCAPTCHA from "react-google-recaptcha";
import { useHistory } from "react-router-dom";
import {GoogleLogin } from 'react-google-login';


export default function Login(props) {
    let history = useHistory();
    let host = 'http://localhost:5000';
    const [credential, setCredential] = useState({ email: '', password: '' });

    const clientId = '694266012493-jstha1pctnlg7u5a2osna8vq4rd9fhta.apps.googleusercontent.com';
    const onLoginSuccess = async (res)=>{

        // console.log('login successfully.', res.profileObj);
        // console.log(res);
        // console.log(res.profileObj.email);
        // console.log(res.profileObj.imageUrl);
        // console.log(res.profileObj.googleId);
        // console.log(res.profileObj.name);
        // localStorage.setItem('token','login with google.')
        // let close = document.getElementById('close');
        // close.click();
        // history.push('/');

        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: res.profileObj.email, password: 'loginwithgoogle' })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            let close = document.getElementById('close');
            close.click();
            localStorage.setItem('token',json.authtoken)
            history.push('/');
            props.showAlert('Your are Login successfully','success');
        }
    }
    const onLoginFailure = (res)=>{
        console.log('login Failure.', res);
    }
  

    const loginSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credential.email, password: credential.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            let close = document.getElementById('close');
            close.click();
            localStorage.setItem('token',json.authtoken)
            setCredential({email:'',password:''})
            history.push('/');
            props.showAlert('Your are Login successfully','success');
        }
    }

    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }

    const handleonchange = (value) => {
        console.log("Captcha value:", value);
    }
    return (
        <>
            {/* Login Component  */}
            <div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="loginModalLabel">Login Here Now</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="text-center">
                                <GoogleLogin clientId={clientId} buttonText="Login With Google" onSuccess={onLoginSuccess} onFailure={onLoginFailure} cookiePolicy={'single_host_origin'} />
                                <div>OR</div>
                            </div>
                            <form onSubmit={loginSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input type="email" className="form-control" id="email" value={credential.email} onChange={onChange} name="email" aria-describedby="emailHelp" />
                                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" value={credential.password} onChange={onChange} name="password" />
                                </div>

                                <ReCAPTCHA sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" onChange={handleonchange} />

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" id='close' data-bs-dismiss="modal">Close</button>
                                    <button type="submit" disabled={credential.password.length < 4 || credential.email.length < 5} className="btn btn-primary">Submit Now</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
