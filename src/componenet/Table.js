// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../componenet/Table.css';

// function Table() {
//   const [data, setData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedRows, setSelectedRows] = useState([]);

//   useEffect(() => {
//     const storedData = JSON.parse(localStorage.getItem('formData')) || [];
//     setData(storedData);
//   }, []);

//   const navigate = useNavigate();

//   // const handleRowClick = (item) => {
//   //   navigate('/form', { state: { selectedRow: item } });
//   // };

//   const handleCheckboxChange = (item) => {
//     if (selectedRows.includes(item)) {
//       setSelectedRows(selectedRows.filter(row => row !== item));
//     } else {
//       setSelectedRows([...selectedRows, item]);
//     }
//   };

//   const handleSelectAll = () => {
//     if (selectedRows.length === data.length) {
//       setSelectedRows([]);
//     } else {
//       setSelectedRows(data);
//     }
//   };

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const handleDeleteRow = (item) => {
//     const updatedData = data.filter(row => row !== item);
//     setData(updatedData);
//     setSelectedRows(selectedRows.filter(row => row !== item));
//     localStorage.setItem('formData', JSON.stringify(updatedData));
//   };

//   const filteredData = data.filter((item) =>
//     item.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     item.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     item.phoneno.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className='table-container'>
//       <input
//         className='search'
//         type='text'
//         placeholder='Search...'
//         value={searchTerm}
//         onChange={handleSearch}
//       />
//       <table>
//         <thead>
//           <tr>
//             {/* <th>
//               <input
//                 type='checkbox'
//                 checked={selectedRows.length === data.length}
//                 onChange={handleSelectAll}
//               />
//             </th> */}
//             <th>First Name</th>
//             <th>Last Name</th>
//             <th>Phone no</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredData.map((item, index) => (
//             <tr
//               key={index}
//               // onClick={() => handleRowClick(item)}
//               className={selectedRows.includes(item) ? 'selected-row' : ''}
//             >
//               {/* <td>
//                 <input
//                   type='checkbox'
//                   checked={selectedRows.includes(item)}
//                   onChange={() => handleCheckboxChange(item)}
//                   onClick={(e) => e.stopPropagation()} 
//                 />
//               </td> */}
//               <td>{item.firstname}</td>
//               <td>{item.lastname}</td>
//               <td>{item.phoneno}</td>
//               <td style={{display:'flex'}}>
//                 <button
//                   onClick={() => {
                   
//                     navigate("/home");
//                   }}
//                   className='appoint_btn'>
//                   Appoint
//                 </button>
//                 <div>
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleDeleteRow(item);
//                   }}
//                 >
//                 Delete
//                 </button>
//                 </div>
      
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Table;
// PatientTable.js
// import React from 'react';
// import { Table, Button, Input } from 'antd';

// const PatientTable = ({ patients = [], searchTerm, handleSearch, deletePatient }) => {
//   const filteredPatients = patients.filter(
//     (patient) =>
//       (patient.fullname && patient.fullname.toLowerCase().includes(searchTerm.toLowerCase())) ||
//       (patient.address && patient.address.toLowerCase().includes(searchTerm.toLowerCase()))
//   );

//   return (
//     <div className="mt-4">
//       <Input
//         placeholder="Search Patients"
//         value={searchTerm}
//         onChange={handleSearch}
//         style={{ marginBottom: 20 }}
//       />
//       <Table dataSource={filteredPatients} rowKey="_id" pagination={false}>
//         <Table.Column title="No." render={(text, record, index) => index + 1} />
//         <Table.Column title="Full Name" dataIndex="fullname" />
//         <Table.Column title="Phone Number" dataIndex="phonenumber" />
//         <Table.Column title="Gender" dataIndex="gender" />
//         <Table.Column title="Address" dataIndex="address" />
//         <Table.Column
//           title="Actions"
//           render={(text, record) => (
//             <>
//               <Button onClick={() => deletePatient(record._id)} type="danger">
//                 Delete
//               </Button>
//             </>
//           )}
//         />
//       </Table>
//     </div>
//   );
// };

// export default PatientTable;
