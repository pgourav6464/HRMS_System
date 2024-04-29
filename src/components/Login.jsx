import React, { useEffect, useState } from 'react'
import axios from "axios"
import {TextField, Typography , Button , CircularProgress} from "@mui/material"
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Login = ({ url, logininput, setlogininput, token, settoken ,admin,setadmin,user,setuser , flage , setflage }) => {
  const navigate = useNavigate()
  const [loader, setloader] = useState(false)


  // chnage handler for getting inpuy values
  const onchangehandeler = (e) => {
    const { name, value } = e.target;
    setlogininput({ ...logininput, [name]: value });
    const { email, password } = logininput;
    // console.log(email, password);
  };
  // login
  const login = async (username, email, password) => {
    setloader(true)

    const api = await axios.post(
      `${url}/api/login`,
      { username, email, password },
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );

    settoken(api.data.token);
    // const decode = await jwt.sign(token, "@@@@@%%%%##");

    
    // console.log(api);

    if (api.data.token) {
      localStorage.setItem("token", JSON.stringify(api.data.token));
       navigate("/");
       setloader(false)
       toast.success((api.data.message), {
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
    else{
      setloader(false);
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
    }
  };
  // submit function
  const onsubmithandler = (e) => {
    e.preventDefault();
    const { email, password } = logininput;
    // const username = email;
    login(email, email, password);
    setlogininput({ email: "", password: "" });  
  };
  
  //  console.log(admin,user)
  return (
    <>
      <div
        className="container d-flex justify-content-center align-items-center "
        style={{ height: "80vh" }}
      >
        {/* <h1>Login</h1> */}
        <form action="" className="login  d-flex flex-column gap-3 ">
          <Typography align="center" variant="h3" color={"secondary"}>
            Login
          </Typography>
          <TextField
            // required
            sx={{ width: "300px" }}
            label="Email OR Username"
            type="text"
            name="email"
            value={logininput.email}
            onChange={onchangehandeler}
          />
          <TextField
            // required
            label="password"
            name="password"
            type="Password"
            value={logininput.password}
            onChange={onchangehandeler}
          />
          {/* <input /> */}
          {/* <h1>password</h1> */}
          {/* <input /> */}
          {loader ? (
            <Button
              // onClick={onsubmithandler}
              variant="contained"
              color="secondary"
            >
              {" "}
            
              <CircularProgress  sx={{ color: "White" , fontSize:"10px" }}  />
            </Button>
          ) : (
            <Button
            sx={{padding:"15px"}}
              onClick={onsubmithandler}
              variant="contained"
              color="secondary"
            >
              Login
            </Button>
          )}
        </form>
      </div>
    </>
  );
};

export default Login