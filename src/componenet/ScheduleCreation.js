import React, { useState, useEffect } from 'react';
import { Button, Col, Form, Row, TimePicker, Table, Select, message, Spin, Modal } from "antd";
import { SearchOutlined,DeleteOutlined, EditOutlined } from '@ant-design/icons';

import moment from 'moment';
import axios from 'axios';

function ScheduleForm() {
  const [branches, setBranches] = useState([]);
  const [filteredBranches, setFilteredBranches] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [schedulesRes, branchesRes, doctorsRes] = await Promise.all([
        axios.get('http://localhost:3000/api/schedule/allschedules'),
        axios.get('http://localhost:3000/api/branch/getallbranches'),
        axios.get('http://localhost:3000/api/doctor/getalldoctors'),
      ]);
      setSchedules(schedulesRes.data);
      const branchData = branchesRes.data;
      const doctorData = doctorsRes.data.doctors;
      setBranches(branchData);
      setFilteredBranches(branchData);
      setDoctors(doctorData);
      setFilteredDoctors(doctorData);
    } catch (error) {
      console.error('Failed to load data:', error);
      message.error('Failed to load data.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (value, type) => {
    if (type === 'branch') {
      const filteredList = branches.filter(branch =>
        branch.name && branch.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredBranches(filteredList);
    } else if (type === 'doctor') {
      const filteredList = doctors.filter(doctor =>
        doctor.fullname && doctor.fullname.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredDoctors(filteredList);
    }
  };

  const handleScheduleSubmit = async values => {
    setLoading(true);
    const { doctorId, branchId, dayOfWeek, timings } = values;
    const startTime = timings[0].format('HH:mm');
    const endTime = timings[1].format('HH:mm');

    const data = {
      doctorId,
      branchId,
      dayOfWeek,
      startTime,
      endTime,
      
    };

    try {
      if (selectedSchedule) {
        // Editing an existing schedule
        await axios.put(`http://localhost:3000/api/schedule/update/${selectedSchedule._id}`, data);
        message.success('Schedule updated successfully!');
      } else {
        // Creating a new schedule
        await axios.post('http://localhost:3000/api/schedule/creation', data);
        message.success('Schedule created successfully!');
      }
      fetchData();
      setIsModalVisible(false);
      setSelectedSchedule(null);
    } catch (error) {
      console.error('Failed to save schedule:', error);
      message.error('Failed to save schedule.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = schedule => {
    setSelectedSchedule(schedule);
    setIsModalVisible(true);
  };

  const handleDelete = async scheduleId => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:3000/api/schedule/delete/${scheduleId}`);
      message.success('Schedule deleted successfully!');
      fetchData();
    } catch (error) {
      console.error('Failed to delete schedule:', error);
      message.error('Failed to delete schedule.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Spin spinning={loading}>
        <Form layout="vertical" onFinish={handleScheduleSubmit}>
          <h1 className="card-title mt-3" style={{fontSize:'18px'}}>Schedule Information</h1>
          <Row gutter={16}>
            <Col span={7} xs={24} sm={24} lg={6}>
              <Form.Item
                required
                label="Doctor's Name"
                name="doctorId"
                rules={[{ required: true }]}
                initialValue={selectedSchedule ? selectedSchedule.doctorId._id : ''}
              >
                <Select
                  showSearch
                  placeholder="Select a doctor"
                  optionFilterProp="children"
                  onSearch={value => handleInputChange(value, 'doctor')}
                  filterOption={false}
                  className="customer_input"
                >
                  {filteredDoctors.map(doctor => (
                    <Select.Option key={doctor._id} value={doctor._id} >
                      {doctor.fullname}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={7} xs={24} sm={24} lg={6}>
              <Form.Item
                required
                label="Days"
                name="dayOfWeek"
                rules={[{ required: true, message: 'Please select a day!' }]}
                initialValue={selectedSchedule ? selectedSchedule.dayOfWeek : ''}
              >
                <Select placeholder="Select day of week" className="customer_input">
                  <Select.Option value="Monday">Monday</Select.Option>
                  <Select.Option value="Tuesday">Tuesday</Select.Option>
                  <Select.Option value="Wednesday">Wednesday</Select.Option>
                  <Select.Option value="Thursday">Thursday</Select.Option>
                  <Select.Option value="Friday">Friday</Select.Option>
                  <Select.Option value="Saturday">Saturday</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            </Row>
            <Row gutter={16}>
            <Col span={7} xs={24} sm={24} lg={6}>
              <Form.Item
                required
                label="Branch"
                name="branchId"
                rules={[{ required: true, message: 'Please select a branch!' }]}
                initialValue={selectedSchedule ? selectedSchedule.branch._id : ''}
              >
                <Select showSearch placeholder="Select a branch" optionFilterProp="children" onSearch={value => handleInputChange(value, 'branch')} filterOption={false} className="customer_input">
                  {filteredBranches.map(branch => (
                    <Select.Option key={branch._id} value={branch._id}>
                      {branch.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={7} xs={24} sm={24} lg={6}>
              <Form.Item
                required
                label="Schedule"
                name="timings"
                rules={[{ required: true, message: 'Please select a time range!' }]}
                initialValue={selectedSchedule ? [moment(selectedSchedule.startTime, 'HH:mm'), moment(selectedSchedule.endTime, 'HH:mm')] : null}
              >
                <TimePicker.RangePicker format="HH:mm" />
              </Form.Item>
            </Col>
          </Row>
          <div className="mt-3">
            <Button className="primary-button" htmlType="submit">SUBMIT</Button>
          </div>
          <hr />

        </Form>
      </Spin>

      <div className="mt-4">
        {/* <h1>Schedule:</h1> */}
        <Table dataSource={schedules} pagination={false} rowKey="_id">
          <Table.Column title="No." dataIndex="number" key="number" render={(text, record, index) => index + 1} />
          <Table.Column title="Doctor Name" dataIndex={["doctorId", "fullname"]} key="doctorId" />
          <Table.Column title="Start Time" dataIndex="startTime" key="startTime" />
          <Table.Column title="End Time" dataIndex="endTime" key="endTime" />
          <Table.Column title="Day Of Week" dataIndex="dayOfWeek" key="dayOfWeek" />
          <Table.Column title="Branch Name" dataIndex={["branch", "name"]} key="branch" />
          <Table.Column title="Actions" dataIndex="actions" key="actions" render={(text, record) => (
            <>
              <Button  onClick={() => handleEdit(record)} icon={<EditOutlined />}/>
              <Button  onClick={() => handleDelete(record._id)} 
              icon={<DeleteOutlined />}
              style={{ marginLeft: 8 }}
                />
            </>
          )} />
        </Table>
      </div>

      <Modal
        title="Edit Schedule"
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setSelectedSchedule(null);
        }}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleScheduleSubmit} initialValues={{
          doctorId: selectedSchedule ? selectedSchedule.doctorId._id : '',
          branchId: selectedSchedule ? selectedSchedule.branch._id : '',
          dayOfWeek: selectedSchedule ? selectedSchedule.dayOfWeek : '',
          timings: selectedSchedule ? [moment(selectedSchedule.startTime, 'HH:mm'), moment(selectedSchedule.endTime, 'HH:mm')] : []
        }}>
          <Form.Item
            required
            label="Doctor's Name"
            name="doctorId"
            rules={[{ required: true }]}
          >
            <Select
              showSearch
              placeholder="Select a doctor"
              optionFilterProp="children"
              onSearch={value => handleInputChange(value, 'doctor')}
              filterOption={false}
            >
              {filteredDoctors.map(doctor => (
                <Select.Option key={doctor._id} value={doctor._id}>
                  {doctor.fullname}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            required
            label="Days"
            name="dayOfWeek"
            rules={[{ required: true, message: 'Please select a day!' }]}
          >
            <Select placeholder="Select day of week">
              <Select.Option value="Monday">Monday</Select.Option>
              <Select.Option value="Tuesday">Tuesday</Select.Option>
              <Select.Option value="Wednesday">Wednesday</Select.Option>
              <Select.Option value="Thursday">Thursday</Select.Option>
              <Select.Option value="Friday">Friday</Select.Option>
              <Select.Option value="Saturday">Saturday</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            required
            label="Branch"
            name="branchId"
            rules={[{ required: true, message: 'Please select a branch!' }]}
          >
            <Select showSearch placeholder="Select a branch" optionFilterProp="children" onSearch={value => handleInputChange(value, 'branch')} filterOption={false} >
              {filteredBranches.map(branch => (
                <Select.Option key={branch._id} value={branch._id}>
                  {branch.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            required
            label="Schedule"
            name="timings"
            rules={[{ required: true, message: 'Please select a time range!' }]}
          >
            <TimePicker.RangePicker format="HH:mm" />
          </Form.Item>

          <div className="d-flex justify-content-end">
            <Button className="primary-button" htmlType="submit">Save</Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default ScheduleForm;
