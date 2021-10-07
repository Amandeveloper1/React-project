import React from 'react'
import './CSS/home.css';

import img1 from './photos/home1.jpg';

export default function Home(props) {

    const clickpro = ()=>{
        props.setProgress(10);
        props.setProgress(50);
        props.setProgress(100);
    }
    return (

        <div className="background">
            <img src={img1} alt="" />
            <div className="passage font ">
                <div className="mars">

                    <h1 className="fs-1 heads" id="rotated" >Welcome to our Wedsite</h1>
                </div>
                <p>Thank you for visit the wedsite i wish your statisty to the wedsite.</p>
                <button type="link" id="veiw" className="btn btn-outline-primary me-2" data-bs-toggle="modal" data-bs-target="#passModal">Veiw more</button>
                <button type="link" id="veiw" onClick={clickpro} className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#passModal">Amount</button>
            </div>
        </div>
    )
}
