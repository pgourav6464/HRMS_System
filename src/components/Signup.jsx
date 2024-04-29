import React, { useState } from 'react'
import { TextField, Typography, Button, CircularProgress } from "@mui/material";
import axios from 'axios';
import { ToastContainer, toast ,Bounce  } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
 

const Signup = ({url}) => {
 const navigate = useNavigate()
  const [loader, setloader] = useState(false);
  const [signupinput, setsignupinput] = useState({name:"" , username:"" , email:"" ,password:"" , isType:"user"})

  const  onchangehandeler =(e)=>{
    const {name,value}=e.target
    setsignupinput({...signupinput , [name]:value})
   
  }

    const signup = async (
      name,
      username,
      email,
      password,
      isType,
      
   
    ) => {
      if (name == "" || username == "" || email == "" || password == "") {
        toast.success("fill details carefully", {
          position: "top-right",
          autoClose: 1001,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } else {
       setloader(true)
        const api = await axios.post(
         `${url}/api/register`,
          {
            name,
            username,
            email,
            password,
            isType,
          },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        if (api.data.message == "user register successfully") {
          setloader(false)
          setTimeout(() => {
            navigate("/login");
            s
          }, 1500);

          toast.success(api.data.message, {
            position: "top-right",
            autoClose: 1001,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        } else {
          setloader(false);
          toast.error(api.data.message, {
            position: "top-right",
            autoClose: 1001,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        }
      }
    };

    const onsubmithandler = () => {
      const { name, username, email, password, isType } = signupinput;
      signup(
        name,
        username,
        email,
        password,
        isType,
  
      );
    };

  return (
    <>
      <div
        className="container d-flex justify-content-center align-items-center "
        style={{ height: "80vh" }}
      >
        {/* <h1>Login</h1> */}
        <form action="" className="signup  d-flex flex-column gap-3 ">
          <Typography align="center" variant="h3" color={"primary"}>
            Create Account
          </Typography>
          <TextField
            // required
            // sx={{ width: "300px" }}
            label=" Name"
            type="text"
            name="name"
            value={signupinput.name}
            onChange={onchangehandeler}
          />
          <TextField
            // required
            label="UserName"
            name="username"
            type="text"
            value={signupinput.username}
            onChange={onchangehandeler}
          />
          {/* <input /> */}
          {/* <h1>password</h1> */}
          {/* <input /> */}

          <TextField
            label="Email"
            type="email"
            name="email"
            value={signupinput.email}
            onChange={onchangehandeler}
          />
          <TextField
            label="Password"
            type="Password"
            name="password"
            value={signupinput.password}
            onChange={onchangehandeler}
          />

          {loader ? (
            <Button variant="contained" color="primary">
              <CircularProgress sx={{ color: "White", fontSize: "10px" }} />
            </Button>
          ) : (
            <Button
              onClick={onsubmithandler}
              variant="contained"
              color="primary"
              sx={{ padding: "15px" }}
            >
              Login
            </Button>
          )}
        </form>
      </div>
    </>
  );
}

export default Signup