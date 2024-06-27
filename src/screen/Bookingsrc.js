import React,{useEffect,useState} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loader from '../componenet/Loader';
import Error from '../componenet/Error';

function Bookingsrc( ) {

    const { doctorid } = useParams();

  const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [doctor, setDoctor] = useState();
    useEffect(() => {
            const fetchData = async () => {
              try {
                setLoading(true);
                const response = await axios.post("/api/doctor/getdoctorbyid/", { doctorid });
                setDoctor(response.data.doctor); // Ensure to set the correct path
                setLoading(false);
              } catch (err) {
                setLoading(false);
                setError(err.message);
              }
            };
        
            fetchData();
          }, [doctorid]);

  return (
    <div className='m-5 '>
   {loading ? (
        <Loader />
      ) : error ? (
        <Error message={error} />
      ) : (
        doctor && (
            <div className='row justify-content-center box_shadow_2 p-2 ' style={{width:"95%",height:"100vh" }}>
            <div className='col-md-5 mt-5'>
                <img src={doctor.imageurls} className='smalling_2' />
                <h1 className='detail_name mt-3 '>{doctor.fullname}</h1>

            </div>
     
        <div className='col-md-4 mt-5' >
            <h1>Doctor Detail</h1>
            <hr/>
            <div >
                <b>
                    <p>Emp Id : {doctor.empid}</p>
                    <p>Phone : {doctor.phonenumber}</p>
                    <p>Specialization : {doctor.specialization}</p>
                    <p>Branch : {doctor.branch}</p>
              
                </b>
            </div>
            <hr/>
            <div style={{float:'right'}}>
                <button className='btn btn-primary'>Book Now</button>
            </div>


        </div>

        </div>
        )
      )    
}  
    </div>
  );
}

export default Bookingsrc;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import Loader from '../componenet/Loader';  // Assuming you have a Loader component
// import Error from '../componenet/Error';    // Assuming you have an Error component

// export default function Bookingsrc() {
//   const { doctorid } = useParams();  // Get the doctorid from the URL
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [doctor, setDoctor] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.post("/api/doctor/getdoctorbyid/", { doctorid });
//         setDoctor(response.data.doctor); // Ensure to set the correct path
//         setLoading(false);
//       } catch (err) {
//         setLoading(false);
//         setError(err.message);
//       }
//     };

//     fetchData();
//   }, [doctorid]);

//   return (
//     <div>
//       <h1>Bookingsrc</h1>
//       <h1>doctorid: {doctorid}</h1>
      
//       {loading ? (
//         <Loader />  // Display a loading spinner or message
//       ) : error ? (
//         <Error message={error} />  // Display an error message
//       ) : (
//         doctor && (
//           <div>
//             <h2>Doctor Details</h2>
//             <p>Name: {doctor.fullname}</p>
//             <p>Specialization: {doctor.specialization}</p>
//             {/* Render more doctor details as needed */}
//           </div>
//         )
//       )}
//     </div>
//   );
// }
