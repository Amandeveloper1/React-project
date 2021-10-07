import React from 'react'
import './CSS/contact.css';
import img1 from './photos/contact1.jpg'

export default function Contact() {
    return (
      <>
        <div className="background">
                <div className="imgs">
                    <img src={img1} alt="" />
                </div>

                <div className="dis">
                    <div className="contant" >
                        <h1 className="hs fs-1 ps-2">Welcome to over Wedsite</h1>
                        <p className="para ps-2">You have to go first Signup us for your acount here.</p>
                        <p className="para-2">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil ipsam odio enim fuga
                            fugit exercitationem optio,
                            non quisquam, ea repellat iste quis assumenda iure aut?</p>
                        <div className="con">
                            <button className="btn btn-outline-primary ml-3" type="submit">View More</button>
                        </div>
                    </div>

                    <div className="container mar" >
                        <form className="forms color-white" method="post" >
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label textcolor">Email address</label>
                                <input type="email" className="form-control enter" id="email" name="email"
                                    aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="massage" className="form-label textcolor">Enter Your Massage</label>
                                <input type="text" className="form-control enter" id="massage" name="massage" />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
      </>
    )
}
