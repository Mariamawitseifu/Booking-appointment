import Navbar from './componenet/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './screen/Home'
import Bookingsrc from './screen/Bookingsrc';
import Login from './componenet/login';
import Register from './componenet/Register';
import { Toaster } from 'react-hot-toast';
// import Form from './componenet/Form';
// import Table from './componenet/Table';
import Adminscrc from './screen/Adminscrc';
import Generaltabs from './screen/Generaltabs';
import Showonmap from './screen/Showonmap';
import Landingpage from './screen/Landingpage';
import DocCreation from './componenet/DocCreation';
import BranchForm from './componenet/BranchCreation';
import ScheduleForm from './componenet/ScheduleCreation';
import PatientForm from './componenet/Form';
import PatientTable from './componenet/Table';
import BookingPatient from './componenet/BookingPatient';
import BotAccess from './componenet/botAccess';
// import Docto from './componenet/Docto';

function App() {
  return (
    <>
   
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/home/:patientId" element={<><Navbar /><Home /></>} />
        <Route path="/book/:doctorid" element={<><Navbar /><Bookingsrc /></>} />
        <Route path="/login" element={ <Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route exact path ='/form' element={<><Navbar /><Form /></>} /> */}
        {/* <Route exact path ='/table' element={<><Navbar /><Table /></>} /> */}
        <Route exact path ='/admin' element={<><Navbar /><Adminscrc/></>} />
        <Route exact path ='/tabs' element={<><Navbar /><Generaltabs/></>} />
        <Route exact path ='/maps' element={<><Navbar /><Showonmap/></>} />
        <Route exact path ='/' element={<><Navbar /><Landingpage/></>} />
        <Route exact path ='/createdoc' element={<><Navbar /><DocCreation/></>} />
        <Route exact path ='/branchcreation' element={<><Navbar /><BranchForm/></>} />
        <Route exact path ='/schedulecreation' element={<><Navbar /><ScheduleForm/></>} />
        <Route exact path ='/patientform' element={<><Navbar /><PatientForm/></>} />
        <Route exact path ='/patienttable' element={<><Navbar /><PatientTable/></>} />
        <Route exact path ='/bookingpatient' element={<><Navbar /><BookingPatient/></>} />
        <Route exact path ='/botaccess' element={<><Navbar /><BotAccess/></>} />
        
        {/* <Route exact path ='/patient/:patientId' element={<><Navbar /><Docto/></>} /> */}
        



      </Routes>
    </BrowserRouter>
    </>
    
  );
}

export default App;
