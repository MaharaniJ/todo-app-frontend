import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./authform.css";
import  env  from "../../config";
import axios from "axios";

const Login = () => {
    const navigate = useNavigate()
    const [passShow, setPassShow] = useState(false);
    const [inpval, setInpval] = useState({
        email: "",
        password: ""
    });

    const setVal = (e) => {
        const { name, value } = e.target;
        setInpval(() => {
            return { ...inpval, [name]: value };
        });
    };

    const loginUser = async (e) => {
        e.preventDefault();
        const { email, password } = inpval;

        if (email === "") {
            toast.error("Please enter Your Email", {
                position: "top-center"
            });
        } else if (!email.includes("@")) {
            toast.warning("Enter Valid Email", {
                position: "top-center"
            });
        } else if (password === "") {
            toast.error("Enter your Password", {
                position: "top-center"
            });
        } else if (password.length < 6) {
            toast.error("Password Must be 6 Characters", {
                position: "top-center"
            });
        } else {
            try {
                const response = await axios.post(`${env.api}/auth/login`, { email, password });
                const { access_token } = response.data.message;
               console.log(access_token);
                if (response.status === 200) {
                    // const token = response.headers['set-cookie'][0].split('access_token=')[1].split(';')[0];
                    // localStorage.setItem("accessToken", token);
                // localStorage.setItem("access_token", response.data.response.token);
                    navigate("/");
                    setInpval({ email: "", password: "" });
                    toast.success('Register Successful')
                } else {
                  
                }
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
                    <form>
                        <div className="form_input">
                            <label htmlFor="email">E-mail</label>
                            <input
                                type="email"
                                value={inpval.email}
                                onChange={setVal}
                                name="email"
                                id="email"
                                placeholder="Enter Your Email Address"
                            />
                        </div>
                        <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <div className="two">
                                <input
                                    type={ !passShow ? "password" : "text"}
                                    value={inpval.password}
                                    onChange={setVal}
                                    name="password"
                                    id="password"
                                    placeholder="Enter Your Password"
                                />
                                <div className="showpass" onClick={()=> setPassShow(!passShow)}>
                                    { !passShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>
                        <button className="btn" onClick={loginUser}>Login</button>
                        <p>Don't have an Account?  <Link to="/register">Sign Up </Link> </p>
                    </form>
                    <ToastContainer />
                </div>
            </section>
        </>
    );
};

export default Login;
