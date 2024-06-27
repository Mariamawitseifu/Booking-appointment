import React, {useState} from 'react'
import DotLoader from "react-spinners/DotLoader";



  

export default function Loader() {

let [loading, setLoading] = useState(true);
let [color, setColor] = useState("#ffffff");

  return (
    <div className="spinner-parent">
    <div className="d-flex justify-content-center align-items-center vh-95 ">
        

        <DotLoader

            color='#4395d1'
            loading={loading}
            css=''
            size={80}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
        </div>
    </div>
  )
}
