import React, { useState, useEffect } from 'react';
import { Button, Col, Form, Input, Row, Table, Modal } from 'antd';
import { SearchOutlined,DeleteOutlined, EditOutlined } from '@ant-design/icons';


function BranchForm() {
  const [branches, setBranches] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingBranch, setEditingBranch] = useState(null);
  const [form] = Form.useForm(); // Use Ant Design's useForm hook

  const handleBranchSubmit = async (values) => {
    try {
      const response = await fetch('api/branch/create/branch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Branch created:', data.branchId);
        fetchBranches(); // Refresh branch list
      } else {
        const errorData = await response.json();
        console.log('Registration failed:', errorData);
      }
    } catch (error) {
      console.log('Error:', error.message);
    }
  };

  const deleteBranch = async (branchId) => {
    try {
      const response = await fetch(`api/branch/getbranchdelete/${branchId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        console.log('Branch deleted successfully');
        fetchBranches(); // Refresh branch list
      } else {
        console.error('Failed to delete branch');
      }
    } catch (error) {
      console.error('Error deleting branch:', error);
    }
  };

  const fetchBranches = async () => {
    try {
      const response = await fetch('api/branch/getallbranches');
      const data = await response.json();
      setBranches(data);
    } catch (error) {
      console.error('Error fetching branches:', error);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const showEditModal = (branch) => {
    setEditingBranch(branch);
    setIsModalVisible(true);
    form.setFieldsValue(branch); // Set form fields value
  };

  const handleEditSubmit = async (values) => {
    try {
      const response = await fetch(`/api/branch/editbranch/${editingBranch._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        console.log('Branch updated successfully');
        fetchBranches(); // Refresh branch list
        setIsModalVisible(false);
        setEditingBranch(null);
      } else {
        const errorData = await response.json();
        console.log('Update failed:', errorData);
      }
    } catch (error) {
      console.log('Error:', error.message);
    }
  };

  return (
    <>
      <Form layout="vertical" onFinish={handleBranchSubmit}>
        <h1 className="card-title mt-3"  style={{fontSize:'18px'}}>Branch Information</h1>
        <Row gutter={20}>
          <Col span={8} xs={24} sm={24} lg={6}>
            <Form.Item
              required
              label="Name"
              name="name"
              rules={[{ required: true }]}
            >
              <Input placeholder="Branch Name" className="customer_input"/>
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={6}>
            <Form.Item
              required
              label="Location"
              name="location"
              rules={[{ required: true }]}
            >
              <Input placeholder="Location" className="customer_input"/>
            </Form.Item>
          </Col>
        </Row>
        <div className="mt-4">
          <Button className="primary-button" htmlType="submit">
            SUBMIT
          </Button>
        </div>
      </Form>
<hr/>
      <div className="mt-4">
        {/* <h1>Branches:</h1> */}
        <Table dataSource={branches} pagination={false} rowKey="_id" className="custom-table">
          <Table.Column
            title="No."
            dataIndex="number"
            key="number"
            render={(text, record, index) => index + 1}
          />
          <Table.Column title="Name" dataIndex="name" key="name" />
          <Table.Column title="Location" dataIndex="location" key="location" />
          <Table.Column
            title="Actions"
            dataIndex="actions"
            key="actions"
            render={(text, record) => (
              <>
                <Button  onClick={() => showEditModal(record)}
                   icon={<EditOutlined />}
                  />
            
                <Button onClick={() => deleteBranch(record._id)} type="danger"
              icon={<DeleteOutlined />}
              style={{ marginLeft: 8 }}
                  />
            
              </>
            )}
          />
        </Table>
      </div>

      <Modal
        title="Edit Branch"
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingBranch(null);
        }}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={editingBranch}
          onFinish={handleEditSubmit}
        >
          <Form.Item
            required
            label="Name"
            name="name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Branch Name" />
          </Form.Item>
          <Form.Item
            required
            label="Location"
            name="location"
            rules={[{ required: true }]}
          >
            <Input placeholder="Location" />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <Button className="primary-button" htmlType="submit">
              SUBMIT
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}

export default BranchForm;
