import { Button, Col, Form, Input, Row, Table, Modal } from "antd";
import React, { useState, useEffect } from "react";
import { SearchOutlined,DeleteOutlined, EditOutlined } from '@ant-design/icons';


const DoctorForm = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFormSubmit = async (values) => {
    try {
      const response = await fetch("/api/doctor/adddoctor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Doctor created:", data.doctor);
        fetchDoctors(); // Refresh doctor list
      } else {
        const errorData = await response.json();
        console.log("Registration failed:", errorData.message);
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  const deleteDoctor = async (doctorId) => {
    try {
      const response = await fetch(`/api/doctor/doctor-delete/${doctorId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Doctor deleted successfully");
        fetchDoctors(); // Refresh doctor list
      } else {
        console.error("Failed to delete doctor");
      }
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await fetch("/api/doctor/getalldoctors");
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched doctors:", data);
        setDoctors(data.doctors);
      } else {
        console.error("Failed to fetch doctors");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter((doctor) =>
    (doctor.fullname && doctor.fullname.toLowerCase().includes(searchTerm.toLowerCase())) ||
    // (doctor.phonenumber && doctor.phonenumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (doctor.email && doctor.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (doctor.specialization && doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleEditDoctor = (doctor) => {
    setEditingDoctor(doctor);
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const response = await fetch(`/api/doctor/doctor-edit/${editingDoctor._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingDoctor),
      });

      if (response.ok) {
        console.log("Doctor updated successfully");
        fetchDoctors(); // Refresh doctor list
      } else {
        console.error("Failed to update doctor");
      }
    } catch (error) {
      console.error("Error updating doctor:", error);
    }

    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleModalChange = (key, value) => {
    setEditingDoctor((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div>
      <Form
        layout="vertical"
        onFinish={handleFormSubmit}
        initialValues={{
          fullname: '',
          phonenumber: '',
          email: '',
          password: '',
          specialization: '',
        }}
      >
        <h1 className="card-title mt-3" style={{fontSize:'18px'}}>Personal Information</h1>
        <Row gutter={16}>
          
          <Col span={7}>
            <Form.Item
              label="Full Name"
              name="fullname"
              rules={[{ required: true, message: 'Full Name is required' }]}
            >
              <Input placeholder="Full Name" className="customer_input"/>
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item
              label="Phone Number"
              name="phonenumber"
              rules={[{ required: true, message: 'Phone Number is required' }]}
            >
              <Input placeholder="Phone Number" className="customer_input"/>
            </Form.Item>
          </Col>
          
          <Col span={7}>
            <Form.Item
              label="Specialization"
              name="specialization"
              rules={[{ required: true, message: 'Specialization is required' }]}
            >
              <Input placeholder="Specialization" className="customer_input"/>
            </Form.Item>
            
          </Col>
          </Row>
          <Row gutter={16}>
          <Col span={7}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Email is required' }]}
            >
              <Input placeholder="Email" className="customer_input"/>
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Password is required' }]}
            >
              <Input placeholder="Password" className="customer_input"/>
            </Form.Item>
            
          </Col>
          <Button type="primary" htmlType="submit" className="mt-5 primary-button">
            SUBMIT
          </Button>
        </Row>
        
        {/* <h1 className="card-title mt-3">Professional Information</h1>
        <Row gutter={16}>
          <Col span={7}>
            <Form.Item
              label="Specialization"
              name="specialization"
              rules={[{ required: true, message: 'Specialization is required' }]}
            >
              <Input placeholder="Specialization" className="customer_input"/>
            </Form.Item>
          </Col>
        </Row> */}
        {/* <Row gutter={16}>
        <Col span={7}>

      
          <Button type="primary" htmlType="submit">
            SUBMIT
          </Button>
      
        </Col>
        </Row> */}
        <hr />


      </Form>

      <div className="mt-4">
        <Input
          placeholder="Search Doctors"
          value={searchTerm}
          onChange={handleSearch}
          style={{ marginBottom: 20 }}
          className="search_input"
          prefix={<SearchOutlined className="search_icon"/>}
        />
        <Table dataSource={filteredDoctors} rowKey="_id" pagination={false} className="custom-table">
          <Table.Column title="No." render={(text, record, index) => index + 1} />
          <Table.Column title="Full Name" dataIndex="fullname" />
          <Table.Column title="Phone Number" dataIndex="phonenumber" />
          <Table.Column title="Email" dataIndex="email" />
          <Table.Column title="Specialization" dataIndex="specialization" />
          <Table.Column
            title="Actions"
            render={(text, record) => (
              <>
              <Button  onClick={() => handleEditDoctor(record)} 
              icon={<EditOutlined />}
              
              />
              <Button onClick={() => deleteDoctor(record._id)}  
              icon={<DeleteOutlined />}
              style={{ marginLeft: 8 }}
              type="danger"
              
              />
               
              
              </>
            )}
          />
        </Table>
      </div>

      <Modal
        title="Edit Doctor"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form layout="vertical">
          <Form.Item label="Full Name">
            <Input
              value={editingDoctor?.fullname}
              onChange={(e) => handleModalChange('fullname', e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Phone Number">
            <Input
              value={editingDoctor?.phonenumber}
              onChange={(e) => handleModalChange('phonenumber', e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Email">
            <Input
              value={editingDoctor?.email}
              onChange={(e) => handleModalChange('email', e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Specialization">
            <Input
              value={editingDoctor?.specialization}
              onChange={(e) => handleModalChange('specialization', e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DoctorForm;
