import React, { useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import {GoogleLogin } from 'react-google-login';

export default function Signup(props) {

    let host = 'http://localhost:5000';
    const [credential, setCredential] = useState({ email: '', name: '', otp: '', password: '', cpassword: ''});
    const clientId = '694266012493-jstha1pctnlg7u5a2osna8vq4rd9fhta.apps.googleusercontent.com';

    const onSignupSuccess = async (res)=>{
        console.log(res.profileObj);

        const response = await fetch(`${host}/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: res.profileObj.email, name: res.profileObj.name, password: "loginwithgoogle" })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            setCredential({password:'',otp:'' , cpassword:''})
            let close = document.getElementById('close');
            close.click();
            localStorage.clear();
            console.log('signup successfully.');
            props.showAlert('Your are Signup successfully','success');
        }
    }
    const onSignupFailure = (res)=>{
        console.log('login Failure.', res);
    }

    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }
    const handleonchange = (value) => {
        console.log("Captcha value:", value);
        let submit = document.getElementById('submitnow');
        submit.removeAttribute('disabled');
    }
    const firstsubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/finduser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credential.email, name: credential.name })
        });
        const json = await response.json();
        if (json.success) {
            console.log(json);
            localStorage.setItem('email', json.email);
            localStorage.setItem('name', json.name);
            localStorage.setItem('otp', json.randNum)
            // setCredential({ email: json.email, name: json.name })
            setCredential({email:'',name:''})
        }
    }

    const secondsubmit = async (e) => {
        e.preventDefault();
        let otplocal = localStorage.getItem('otp')
        let email = localStorage.getItem('email');
        let name = localStorage.getItem('name');
        if (otplocal.length === 4) {
            if (credential.password === credential.cpassword) {
                if (otplocal === credential.otp) {
                    const response = await fetch(`${host}/api/auth/createuser`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ email: email, name: name, password: credential.password })
                    });
                    const json = await response.json();
                    console.log(json);
                    if (json.success) {
                        setCredential({password:'',otp:'' , cpassword:''})
                        let close = document.getElementById('close');
                        close.click();
                        localStorage.clear();
                        props.showAlert('Your are Signup successfully','success');
                    }
                }else{
                    console.log('invalid opt and opt are  not match');
                }
            }else{
                console.log('password and confirm password are not match.');
            }
        }else{
            console.log('That otp is invalid');
        }
    }

   
   
    return (
        <>
            {/* Signup Component  */}
            <div className="modal fade" id="signupModal" tabIndex="-1" aria-labelledby="signupModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="signupModalLabel">Signup Here Now</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="text-center">
                                 <GoogleLogin clientId={clientId} buttonText="Signup With Google" onSuccess={onSignupSuccess} onFailure={onSignupFailure} cookiePolicy={'single_host_origin'} />
                              
                                <div>OR</div>
                            </div>
                            <form onSubmit={firstsubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input type="email" className="form-control" id="email" value={credential.email} onChange={onChange} name="email" aria-describedby="emailHelp" />
                                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Enter Your Name</label>
                                    <input type="text" className="form-control" id="name" value={credential.name} onChange={onChange} name='name' aria-describedby="emailHelp" />
                                </div>
                                <button type="submit"  className="btn btn-primary mb-3">Sent opt Now</button>
                            </form>
                            <form onSubmit={secondsubmit}>
                                <div className="mb-3">
                                    <label htmlFor="top" className="form-label">Enter OTP Here</label>
                                    <input type="text" className="form-control" id="otp" value={credential.otp} onChange={onChange} name="otp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Create Password</label>
                                    <input type="password" className="form-control" id="password" value={credential.password} onChange={onChange} name="password" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                                    <input type="password" className="form-control" id="cpassword" value={credential.cpassword} onChange={onChange} name="cpassword" />
                                </div>

                                <ReCAPTCHA sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" onChange={handleonchange} />
                               
                                <button type="submit" id='submitnow' disabled className="btn btn-primary mt-3 ">Submit Now</button>
                                <button type="button" className="btn btn-secondary mt-3 ms-2" id='close' data-bs-dismiss="modal">Close</button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
