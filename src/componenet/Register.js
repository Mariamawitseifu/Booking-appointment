import { Button, Form, Input } from "antd";
import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "./Loader";
// import { hideLoading, showLoading } from "../redux/alertsSlice";

function Register() {
//   const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    try {
    //   dispatch(showLoading());
    setLoading(true);
      const response = await axios.post("/api/user/register", values);
    //   dispatch(hideLoading());
    setLoading(false);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
    //   dispatch(hideLoading());
    setLoading(false);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="authentication">
      <div className="authentication_form card p-3">
        <h1 className="card-title">Welcome</h1>
        {loading ? <Loader /> :
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Name" name="name">
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input placeholder="Password" type="password" />
          </Form.Item>
            <Form.Item label="Confirm Password" name="confirmPassword">
                    <Input placeholder="Confirm Password" type="password" />
            </Form.Item>

          <Button
            className="primary-button my-2 full-width-button"
            htmlType="submit"
          >
            REGISTER
          </Button>

          <Link to='/login'className="anchor mt-2">
            LOGIN
          </Link>
        </Form>
        }
      </div>
    </div>
  );
}

export default Register;