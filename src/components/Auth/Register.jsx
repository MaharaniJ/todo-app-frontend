import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import env  from '../../config';
import "./authform.css";
import axios from 'axios';

const Register = () => {
    const navigate = useNavigate()
    const [passShow, setPassShow] = useState(false);
    
const [inputval, setInputval] = useState({
        name: "",
        email: "",
        password: "",
        
    })

    const setVal = (e) => {
        ////  console.log(e.target.value)
        const { name, value } = e.target;
        setInputval(() => {
            return { ...inputval, [name]: value }
        })
    };

    // console.log(inputval);
    const addUserData = async (e) => {
        e.preventDefault();

        const { name, email, password} = inputval;

        if (name === "") {
            toast.warning("Please enter Your Name", {
                position: "top-center"
            });
        } else if (email === "") {
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
        } 
         else {
            // console.log("User Registration Successfully")
            const data = await axios.post(`${env.api}/auth/register`, inputval)
            toast.success("Registration Successfully Done 🙂!", {
                position: "top-center"
            });
            if(data){
                setInputval({ ...inputval, name: "", email: "", password: "" })
                navigate('/')
            }
            
       }
    }

    return (
        <>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Sign Up</h1>
                    </div>

                    <form>
                        <div className="form_input">
                            <label htmlFor="fname">Name</label>
                            <input
                                type="text"
                                onChange={setVal}
                                value={inputval.name}
                                name="name"
                                id="fname"
                                placeholder="Enter Your Name"
                            />
                        </div>

                        <div className="form_input">
                            <label htmlFor="email">E-mail</label>
                            <input
                                type="email"
                                onChange={setVal}
                                value={inputval.email}
                                name="email"
                                id="email"
                                placeholder="Enter Your Email Address"
                            />
                        </div>

                        <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <div className="two">
                                <input
                                    type={!passShow ? "password" : "text"}
                                    onChange={setVal}
                                    value={inputval.password}
                                    name="password"
                                    id="password"
                                    placeholder="Enter Your Password"
                                />
                                <div className="showpass" onClick={() => setPassShow(!passShow)}>
                                    {!passShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>
                        <button className="btn" onClick={addUserData}>Sign Up</button>
                        <p>Already have an Account? <Link to="/login">Login</Link></p>

                    </form>
                    <ToastContainer />
                </div>
            </section>
        </>
    )
}

export default Register;