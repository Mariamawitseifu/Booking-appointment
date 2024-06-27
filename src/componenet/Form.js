import { Button, Col, Form, Input, Row, Table, Modal } from "antd";
import React, { useState, useEffect } from "react";
import { SearchOutlined, DeleteOutlined, ScheduleOutlined } from '@ant-design/icons';
import { Link, useLocation } from "react-router-dom";
import axios from 'axios';

const PatientForm = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const doctorId = queryParams.get('doctorId');
  const dayOfWeek = queryParams.get('dayOfWeek');
  const startTime = queryParams.get('startTime');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFormSubmit = async (values) => {
    try {
      const isAlreadyRegistered = patients.some(
        (patient) => patient.fullname.toLowerCase() === values.fullname.toLowerCase()
      );
  
      if (isAlreadyRegistered) {
        setIsModalVisible(true);
        setModalText('This patient is already registered.');
      } else {
        const response = await fetch("/api/patient/addpatient", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
  
        if (response.ok) {
          const patient = await response.json();
          await handleSchedule(patient._id);
          fetchPatients();
          setIsModalVisible(true);
          setModalText('Patient successfully registered and appointment booked.');
        } else {
          const errorData = await response.json();
          console.log("Registration failed:", errorData.message);
          setIsModalVisible(true);
          setModalText(`Registration failed: ${errorData.message}`);
        }
      }
    } catch (error) {
      console.log("Error:", error.message);
      setIsModalVisible(true);
      setModalText(`Error: ${error.message}`);
    }
  };
  
  
  const deletePatient = async (patientId) => {
    try {
      const response = await fetch(`/api/patient/patient-delete/${patientId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchPatients();
      } else {
        console.error("Failed to delete patient");
      }
    } catch (error) {
      console.error("Error deleting patient:", error);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await fetch("/api/patient/getallpatients");
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        setPatients(data.patients);
      } else {
        console.error("Failed to fetch patients");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const filteredPatients = patients.filter((patient) =>
    (patient.fullname && patient.fullname.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (patient.address && patient.address.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  const handleSchedule = async (patientId) => {
    try {
      const response = await axios.post(`/api/patient/patients/${patientId}/enroll`, {
        doctorId,
        dayOfWeek,
        startTime,
      });
  
      if (response.data) {
        console.log('Appointment booked successfully:', response.data);
      } else {
        console.error('Error booking appointment:', response);
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="mt-3 m-3 box_shadow_3 p-3" style={{ background: '#ffff', borderRadius: '10px' }}>
      <Form layout="vertical" onFinish={handleFormSubmit}>
        <h1 className="card-title mt-3" style={{ fontSize: '18px' }}>Personal Information</h1>
        <Row gutter={16}>
          <Col span={7}>
            <Form.Item
              label="Full Name"
              name="fullname"
              rules={[{ required: true, message: 'Full Name is required' }]}
            >
              <Input placeholder="Full Name" className="customer_input" />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item
              label="Phone Number"
              name="phonenumber"
              rules={[{ required: true, message: 'Phone Number is required' }]}
            >
              <Input placeholder="Phone Number" className="customer_input" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={7}>
            <Form.Item
              label="Gender"
              name="gender"
              rules={[{ required: true, message: 'Gender is required' }]}
            >
              <Input placeholder="Gender" className="customer_input" />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: 'Address is required' }]}
            >
              <Input placeholder="Address" className="customer_input" />
            </Form.Item>
          </Col>
        </Row>
        <Button type="" htmlType="submit" className="mt-4 primary-button">
          SUBMIT
        </Button>
        <hr />
      </Form>

      <div className="mt-4">
  <Input
    placeholder="Search Patients"
    value={searchTerm}
    onChange={handleSearch}
    style={{ marginBottom: 20 }}
    className="search_input"
    prefix={<SearchOutlined className="search_icon" />}
  />
  <Table dataSource={filteredPatients} rowKey="_id" pagination={false} className="custom-table">
    <Table.Column title="No." render={(text, record, index) => index + 1} />
    <Table.Column title="Full Name" dataIndex="fullname" />
    <Table.Column title="Phone Number" dataIndex="phonenumber" />
    <Table.Column title="Gender" dataIndex="gender" />
    <Table.Column title="Address" dataIndex="address" />
    <Table.Column
      title="Actions"
      render={(text, record) => (
        <>
          <Button
            onClick={() => handleSchedule(record._id)}
            icon={<ScheduleOutlined />}
          />
          <Button
            onClick={() => deletePatient(record._id)}
            type="danger"
            icon={<DeleteOutlined />}
            style={{ marginLeft: 8 }}
          />
        </>
      )}
    />
  </Table>
</div>


      {/* Success Modal */}
      <Modal
  title="Registration Status"
  visible={isModalVisible}
  onOk={() => setIsModalVisible(false)}
  onCancel={() => setIsModalVisible(false)}
>
  <p>{modalText}</p>
</Modal>

    </div>
  );
};

export default PatientForm;
