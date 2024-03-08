import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import path from '../path';
import { useNavigate } from 'react-router-dom';


function LoginPage() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
    password: ""
  });
  const handleloginFormChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleloginSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = state;
    await axios.post(`${path}/login`, {
      email,
      password
    })
      .then((response) => {
        console.log(response)
        localStorage.setItem("token", response.data)
        toast.success('Login Successfull', {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        navigate("/home")
      })
      .catch(error => {
        console.error('Error calling API', error);
        toast.error('Email or Password are invalid ', {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        navigate("/")

      });
  };
  return (
    <>
      <form action="/" onSubmit={handleloginSubmit}>
        <div className='formstyle'>
          <h1 className='centertext'>WELCOME TO STOCK GALLERY</h1>
          <hr />
          <label htmlfor="email"><b>EMAIL</b></label>
          <input className='inputtype' type="text" placeholder="Username" name="email" id="email" onChange={handleloginFormChange} required />

          <label htmlfor="password"><b>PASSSWORD</b></label>
          <input className='inputtype' type="password" placeholder="Password" name="password" id="password" onChange={handleloginFormChange} required />

          <button className='button' type="submit">LOGIN</button>
          <p className='centertext1'>Don't have an account? <a href="/signup"><u>REGISTER</u></a></p>
        </div>
      </form>

    </>
  );
}

export default LoginPage;