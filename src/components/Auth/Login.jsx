import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./authform.css";
// import  env  from "../../config";
import axios from "axios";
import axiosInstance from '../../config';

const Login = () => {
    const navigate = useNavigate()
    const [passShow, setPassShow] = useState(false);
   
    const loginUser = async (e) => {
        e.preventDefault();
    
        // const email = e.target.elements.email.value;
        // const password = e.target.elements.password.value;
       const email = e.target.name.value;
       const password = e.target.password.value;

     if (email==="" ) {
                toast.error("Please enter Your Email", {
              position: "top-center"
             });
         } 
         else if (password === "") {
             toast.error("Enter your Password", {                position: "top-center"
             });
            } else if (password.length < 6) {
             toast.error("Password Must be 6 Characters", {
                 position: "top-center"
             });
        } else {
            try {
                 await axiosInstance.post('/auth/login', { email, password });
                 toast.success("login success")
                 navigate('/')
              
              } catch (error) {
                console.error(error);
                toast.error("Invalid Credentials", {
                  position: "top-center"
                });
              }
            } 
        
    };

    return (
        <>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Welcome Back, Log In</h1>
                        <p>Hi, we are glad you are back. Please login.</p>
                    </div>
                    <form onSubmit={loginUser}>
                        <div className="form_input">
                            <label htmlFor="email">E-mail</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter Your Email Address"
                                required
                            />
                        </div>
                        <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <div className="two">
                                <input
                                    type={ !passShow ? "password" : "text"}
                                   name="password"
                                   placeholder="Enter Your Password"
                                   required
                                />
                                <div className="showpass" onClick={()=> setPassShow(!passShow)}>
                                    { !passShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>
                        <button className="btn" >Login</button>
                        <p>Don't have an Account?  <Link to="/register">Sign Up </Link> </p>
                    </form>
                    <ToastContainer />
                </div>
            </section>
        </>
    );
};

export default Login;
