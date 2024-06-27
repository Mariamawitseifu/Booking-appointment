import React, { useEffect, useState } from 'react';
import { Table, message, Spin } from 'antd';
import axios from 'axios';
// import 'antd/dist/antd.css';

const BookingPatient = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/patient/getallpatientswithdoctors');
      setPatients(response.data.patients);
      setLoading(false);
    } catch (error) {
      message.error('Failed to fetch patients data');
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Patient Name',
      dataIndex: 'fullname',
      key: 'fullname',
    },
    {
      title: 'Doctor(s)',
      dataIndex: 'appointment',
      key: 'appointment',
      render: (appointments) => (
        <ul>
          {appointments && appointments.length > 0 ? (
            appointments.map((appointment) => (
              <li key={appointment._id}>{appointment.fullname}</li>
            ))
          ) : (
            <li>No appointments</li>
          )}
        </ul>
      ),
    },
    // Add more columns here as needed
  ];

  return (
    <div style={{ padding: '20px' }}>
      {loading ? (
        <Spin tip="Loading..." />
      ) : (
        <Table
          dataSource={patients}
          columns={columns}
          rowKey="_id" // Ensure you have a unique key for each row
          pagination={{ pageSize: 10 }} // Adjust page size as needed
        />
      )}
    </div>
  );
};

export default BookingPatient;
