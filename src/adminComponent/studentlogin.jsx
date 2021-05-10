import React, { useEffect, useState } from 'react';
import './studentlogin.css';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

import { useForm } from 'react-hook-form';
const Studentlogin = () => {

    const { register, handleSubmit, formState: { errors }, } = useForm();
    const history=useHistory();

    const onSubmit = (data) => {
        console.log(data);
        console.log(data["username"]);


        axios.get('https://hirenserver.herokuapp.com/user/'+data["username"]).then(res => {
          console.log("api response",res["data"]);
          if(data["password"] == res["data"][0]["password"])
          { 
              console.log("user is right");
              localStorage.setItem("Student_Login",true);             
              history.push('/studentNavbar');
          }

        }).catch((err) => console.log(err));
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} >
            <div class="container">
                <div class="box">
                    <h1>Login</h1>
                    <div class="row">
                        <input type="text" placeholder="Username" {...register('username', { required: true })} />
                    </div>
                    {errors.username && <span style={{ color: "red" }}>Username required</span>}
                    <div class="row">
                        <input type="password" placeholder="Password" {...register('password', { required: true })} />
                    </div>
                    {errors.password && <span style={{ color: "red" }}>Password required</span>}
                    <div class="row">
                        <button id="login" href="#">Login</button>
                    </div>
                </div>
            </div>
        </form>
    )
}
export default Studentlogin;
