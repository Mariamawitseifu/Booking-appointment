import React from 'react'

import { useNavigate } from 'react-router-dom';
import iconimg from '../../src/assets/logo_062303.png'


import '../index.css'


export default function Navbar() {


const navigate = useNavigate()
  
  return (
    
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light box_shadow_4">
  <div class="container-fluid">
  {/* <img className= 'logoimage'src={iconimg} style={{}}/> */}

  <a className="navbar-brand d-flex align-items-center" href="/">
            <img src={iconimg} alt="Logo" width="35" height="40" style={{ marginRight: '10px' }} /> {/* Display the logo */}
            Droga Consulting
      </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ">
    

        {/* <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/table">Appointment</a>
        </li>
         */}
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/register">Register</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/login">Login</a>
        </li>
    
      </ul>
  
    </div>
  </div>
</nav>
    </div>
  )
}
