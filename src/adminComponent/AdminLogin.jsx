import React from 'react';
import './adminlogin.css'
import { useForm } from 'react-hook-form';
import {useHistory} from 'react-router-dom';

function AdminLogin() {
  const history=useHistory();
  const { register, handleSubmit, errors, } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    validateAdmin(data)
  };

  const validateAdmin = (data) => {
    if (data["email"] == "test@test.com" && data["password"] == "test") {
      console.log("admin is ok");
      localStorage.setItem("Login",true);
                console.log("login value",localStorage.getItem("Login"));
      history.push('/showuser');
    }
  }
  return (
    <div className="full-screen-container">
      <div className="login-container">
        <h3 className="login-title">Admin</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group">
            <label>Email</label>
            <input type="email"  {...register('email', { required: true })} />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" {...register('password', { required: true })} />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;