import React, { useState } from 'react';
import axios from 'axios';
import path from '../path';
import '../App.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
function SignUp() {
    const navigate = useNavigate();
    const [state, setState] = useState({
        email: "",
        name: "",
        password: "",
        cnfpassword: ""
    });

    const handleFormChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, name, password, cnfpassword } = state;
        if (password !== cnfpassword) {
            alert("Password & confirm password didn't match.");
            return;
        }
        const res = await axios.post(`${path}/registration`, {
            email,
            name,
            password
        })
        if (res.data.success === false) {
            toast.error('User Already Registered with this email_id', {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            navigate("/signup")
        }
        else {
            toast.success('Registered', {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            navigate("/")
        }
    };
    return (
        <>
            <form action="/" onSubmit={handleSubmit}>
                <div className='formstyle'>
                    <h1 className='centertext'>SIGN UP</h1>
                    <p className='centertext'>Please fill this form to create an account.</p>
                    <hr />

                    <label htmlfor="email"><b>EMAIL</b></label>
                    <input
                        className='inputtype'
                        type="text"
                        placeholder="Enter Email"
                        name="email"
                        id="email"
                        onChange={handleFormChange}
                        required
                    />

                    <label htmlfor="name"><b>NAME</b></label>
                    <input
                        className='inputtype'
                        type="text"
                        placeholder="Enter your Name"
                        name="name" id="name"
                        onChange={handleFormChange}
                        required
                    />

                    <label htmlfor="password"><b>PASSWORD</b></label>
                    <input
                        className='inputtype'
                        type="password"
                        placeholder="Enter Your Password"
                        name="password"
                        id="password"
                        onChange={handleFormChange}
                        required
                    />
                    <label htmlfor="cnfpassword"><b>CONFIRM PASSWORD</b></label>
                    <input
                        className='inputtype'
                        type="password"
                        placeholder="Confirm Password"
                        name="cnfpassword"
                        id="cnfpassword"
                        onChange={handleFormChange}
                        required
                    />

                    <button className='button' type="submit" >SIGN UP</button>
                    <p className='centertext'>Have already an account? <a href="/"><u>LOGIN HERE</u></a></p>

                </div>
            </form>
        </>
    );
}

export default SignUp;