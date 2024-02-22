import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../public/logo-no-background.png';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <a className="navbar-brand" href="#">
                    <img src={logo} style={{ maxHeight: '50px' }} alt="company logo" />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="#">IPL</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">WWE</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Finance</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Politics</a>
                        </li>
                    </ul>
                    <div className="search-bar flex">
                        <input id="search-text" type="text" className="news-input" placeholder="e.g. Science" />
                        <button id="search-button" className="search-button">Search</button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
