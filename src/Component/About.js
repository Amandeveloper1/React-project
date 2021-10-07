import React from 'react'
import { Link } from "react-router-dom";

export default function About() {

    return (
        <main className="container">
        <div className="p-4 p-md-5 mb-4 mt-4 text-white rounded bg-dark">
            <div className="col-md-6 px-0 font">
                <h1 className="display-4 fst-italic">Title of a longer featured blog post</h1>
                <p className="lead my-3">Multiple lines of text that form the lede, informing new readers quickly and
                    efficiently about what’s most interesting in this post’s contents.</p>
                <p className="lead mb-0"><Link to="#" className="text-white fw-bold">Continue reading...</Link></p>
            </div>
        </div>
        <div className="row mb-2" data-aos="fade-right" data-aos-duration="1000">
            <div className="col-md-6">
                <div  id="anima"
                    className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                    <div id="contantss" className="col p-4 d-flex flex-column position-static">
                        <strong className="d-inline-block mb-2 text-primary">World</strong>
                        <h3 className="mb-0">Featured post</h3>
                        <div className="mb-1 text-muted">Nov 12</div>
                        <p className="card-text mb-auto">This is a wider card with supporting text below as a natural
                            lead-in to additional content.</p>
                        <Link to="#" className="stretched-link">Continue reading</Link>
                    </div>
                    <div className="col-auto d-none d-lg-block">
                        <svg className="bd-placeholder-img" width="200" height="250" xmlns="https://source.unsplash.com/1600x900/?employee"
                            role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice"
                            focusable="false">
                            <title>Placeholder</title>
                            <rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef"
                                dy=".3em">Thumbnail</text>
                        </svg>

                    </div>
                </div>
            </div>
            <div className="col-md-6" data-aos="fade-right" data-aos-duration="1000">
                <div id="anima"
                    className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                    <div id="contants" className="col p-4 d-flex flex-column position-static">
                        <strong className="d-inline-block mb-2 text-success">Design</strong>
                        <h3 className="mb-0">Post title</h3>
                        <div className="mb-1 text-muted">Nov 11</div>
                        <p className="mb-auto">This is a wider card with supporting text below as a natural lead-in to
                            additional content.</p>
                        <Link to="#" className="stretched-link">Continue reading</Link>
                    </div>
                    <div className="col-auto d-none d-lg-block">
                        {/* <img src="https://source.unsplash.com/1600x900/?employee" alt="" /> */}
                        <svg className="bd-placeholder-img" width="200" height="250" src="https://source.unsplash.com/1600x900/?employee"
                            role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice"
                            focusable="false">
                            <title>Placeholder</title>
                            <rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef"
                                dy=".3em">Thumbnail</text>
                        </svg>

                    </div>
                </div>
            </div>
        </div>

    </main>
    )

}