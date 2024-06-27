import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Select, TimePicker, Row, Col } from 'antd';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-clock/dist/Clock.css';
import Loader from '../componenet/Loader'; 
import Error from '../componenet/Error'; 
import Doctor from '../componenet/Docto'; 
import { useParams } from 'react-router-dom'; 
import moment from 'moment'; 

const { RangePicker } = TimePicker;
const { Option } = Select;

const Home = () => {
  const { patientId } = useParams(); 
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dayOfWeek, setDayOfWeek] = useState(null);
  const [timeRange, setTimeRange] = useState(null);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/doctor/getalldoctors');
      setDoctors(response.data.doctors);
      setLoading(false);
    } catch (error) {
      setError(error);
      console.error('Error fetching doctors:', error);
      setLoading(false);
    }
  };

  const filterDoctors = async () => {
    if (!dayOfWeek || !timeRange) {
      fetchDoctors();
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get('/api/doctor/filter', {
        params: {
          dayOfWeek,
          startTime: timeRange[0].format('HH:mm'),
          endTime: timeRange[1].format('HH:mm')
        }
      });
      console.log('Filtered doctors:', response.data.doctors);
      setDoctors(response.data.doctors);
      setLoading(false);
    } catch (error) {
      setError(error);
      console.error('Error filtering doctors:', error);
      setLoading(false);
    }
  };

  const handleDayChange = (value) => {
    setDayOfWeek(value);
  };

  const handleTimeChange = (time) => {
    setTimeRange(time);
  };

  return (
    <div className='container' style={{background:'#fff'}}>
      <div className='mt-5'>
        <div className=''>
        <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            label="Day of Week"
            name="dayOfWeek"
            rules={[{ required: true, message: 'Day of Week is required' }]}
          >
            <Select
              placeholder="Select day of week"
              onChange={handleDayChange}
            >
              <Option value="Monday">Monday</Option>
              <Option value="Tuesday">Tuesday</Option>
              <Option value="Wednesday">Wednesday</Option>
              <Option value="Thursday">Thursday</Option>
              <Option value="Friday">Friday</Option>
              <Option value="Saturday">Saturday</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Time Range"
            name="timeRange"
            rules={[{ required: true, message: 'Time Range is required' }]}
          >
            <RangePicker
              format="HH:mm"
              onChange={handleTimeChange}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label=" " colon={false}> {/* Empty label to align with other form items */}
            <Button
            className="primary-button"
              type="primary"
              onClick={filterDoctors}
              style={{ marginTop: '4px' }} // Adjust margin to align with input fields
            >
              Filter Doctors
            </Button>
          </Form.Item>
        </Col>
      </Row>
        </div>
      </div>
      <div className='row justify-content-center g-5 mt-5 mb-5'>
  {loading ? (
    <Loader />
  ) : doctors.length > 0 ? (
    doctors.map((doctor) => (
      <div key={doctor._id || doctor.id} className='col-md-4 col-sm-6 mt-2' >
        <Doctor
          doctor={doctor}
          dayOfWeek={dayOfWeek}
          startTime={timeRange}
          patientId={patientId}
        />
      </div>
    ))
  ) : error ? (
    <Error message={error.message} />
  ) : (
    <h1>No doctors found.</h1>
  )}
</div>

    </div>
  );
};

export default Home;
