import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import avat from '../assets/avator.jpg';

const DoctorComponent = ({ doctor, dayOfWeek, startTime, patientId }) => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [buttonText, setButtonText] = useState('Book Now'); // Default button text
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/patient/doctors/${doctor._id}/appointments`);
        setAppointments(response.data);

        // Perform availability check here
        const isAvailable = checkAvailability(startTime, appointments);
        setButtonText(isAvailable? 'Book Now' : 'Booked');
      } catch (error) {
        console.error('Error fetching appointments:', error);
        message.error('Failed to load appointments.');
      }
    };

    const checkAvailability = (requestedTimeSlot, appointments) => {
  // Initialize a flag to track if the doctor is booked
  let isBooked = false;

  // Iterate through the bookedTimes of each appointment
  for (let appointment of appointments) {
    for (let bookedTime of appointment.bookedTimes) {
      // Parse the requested startTime and endTime to Date objects
      const requestedStartTime = new Date(`1970-01-01T${requestedTimeSlot[0].format('HH:mm')}Z`);
      const requestedEndTime = new Date(requestedStartTime.getTime());
      requestedEndTime.setMinutes(requestedEndTime.getMinutes() + 30); // Add 30 minutes for the appointment duration

      // Parse the bookedTime startTime and endTime to Date objects
      const bookedStartTime = new Date(bookedTime.startTime);
      const bookedEndTime = new Date(bookedTime.endTime);

      // Check if the requested time slot overlaps with any booked time slot
      if ((requestedStartTime >= bookedStartTime && requestedStartTime <= bookedEndTime) ||
          (requestedEndTime >= bookedStartTime && requestedEndTime <= bookedEndTime)) {
        isBooked = true;
        break; // Exit the inner loop if a booking is found
      }
    }

    if (isBooked) {
      break; // Exit the outer loop if a booking is found
    }
  }

  // Return true if the doctor is available, false otherwise
  return!isBooked;
};

    fetchAppointments();
  }, [doctor._id, startTime]);

  const handleCheckAvailability = async () => {
    // Ensure startTime is defined and is an array with at least one element
    if (!startTime ||!Array.isArray(startTime) || startTime.length === 0) {
      console.error('Error: startTime is undefined or empty.');
      message.error('Please select a valid start time.');
      return; // Exit the function early if startTime is invalid
    }
  
    try {
      // Fetch the doctor's appointments from your backend
      const appointmentsResponse = await axios.get(`http://localhost:5000/api/patient/doctors/${doctor._id}/appointments`);
  
      // Initialize a flag to track if the doctor is booked
      let isBooked = false;
  
      // Iterate through the bookedTimes of each appointment
      for (let appointment of appointmentsResponse.data) {
        for (let bookedTime of appointment.bookedTimes) {
          // Parse the requested startTime and endTime to Date objects
          const requestedStartTime = new Date(`1970-01-01T${startTime[0].format('HH:mm')}Z`);
          const requestedEndTime = new Date(requestedStartTime.getTime());
          requestedEndTime.setMinutes(requestedEndTime.getMinutes() + 30); // Add 30 minutes for the appointment duration
  
          // Parse the bookedTime startTime and endTime to Date objects
          const bookedStartTime = new Date(bookedTime.startTime);
          const bookedEndTime = new Date(bookedTime.endTime);
  
          // Check if the requested time slot overlaps with any booked time slot
          if ((requestedStartTime >= bookedStartTime && requestedStartTime <= bookedEndTime) ||
              (requestedEndTime >= bookedStartTime && requestedEndTime <= bookedEndTime)) {
            isBooked = true;
            break; // Exit the inner loop if a booking is found
          }
        }
  
          if (isBooked) {
            break; // Exit the outer loop if a booking is found
          }
      }
  
      // Update the button text based on whether the doctor is booked
      if (isBooked) {
        setButtonText('Booked');
      } else {
        setButtonText('Book Now');
        navigate(`/patientform?doctorId=${doctor._id}&dayOfWeek=${dayOfWeek}&startTime=${startTime[0].format('HH:mm')}`);
      }
    } catch (error) {
      console.error('Error checking availability:', error);
      message.error('Doctor is treating another patient during this time');
    }
  };
  
  
  const handleBookAppointment = () => {
    if (buttonText === 'Book Now') {
      navigate(`/patientform?doctorId=${doctor._id}&dayOfWeek=${dayOfWeek}&startTime=${startTime[0].format('HH:mm')}`);
    } else {
      setIsModalVisible(true);
      setModalMessage('Doctor is treating another patient during this time');
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setModalMessage('');
  };

  return (
    <div className='row box_shadow_2' style={{ padding: '15px', width: '105%' }}>
      <div className='col-md-4 d-flex justify-content-center align-items-center'>
        <img src={avat} className='smalling' alt='Doctor' />
      </div>
      <div className='col-md-9'>
        <h1 className='title mt-2'>{doctor.fullname}</h1>
        <div className='doc_det'>
          <p>Emp Id: {doctor.empid}</p>
          <p>Phone: {doctor.phonenumber}</p>
          <p>Specialization: {doctor.specialization}</p>
        </div>
        <div style={{ float: 'left', marginTop: '10px' }}>
          <Button className='primary-button' onClick={handleCheckAvailability}>
            {buttonText}
          </Button>
        </div>
      </div>
      <Modal
        title="Doctor Unavailable"
        visible={isModalVisible}
        onOk={handleModalClose}
        onCancel={handleModalClose}
        okText="OK"
      >
        <p>{modalMessage}</p>
      </Modal>
    </div>
  );
};

export default DoctorComponent;
