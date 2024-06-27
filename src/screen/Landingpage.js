import React from 'react'
import { Link } from 'react-router-dom'
import landimage from '../../src/assets/cover.png'

export default function Landingpage() {
  return (
    <div className='row landing' style={{paddingLeft:'30px'}}>
    
        <div className='col-md-6 ' style={{marginLeft:'0px'}}>

               
                <h2 style={{color:'black',fontWeight:'bold',fontSize:'60px'}}>Droga Consulting</h2>
                <p style={{fontSize:'1.5rem'}}>"Transforming insights into results."</p>

                <Link to='/login' >
                
                    <button className='btn btn-secondary mt-3' >
                    Get Started
                    </button>
                
                </Link>
        </div>

        <div className='col-md-6 ' >
        <img className= 'hero_img'src={landimage} style={{width:'90%'}}/>
        </div>
          
      
    </div>
  )
}
