import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Admin from "./components/Admin";
import ApplyLeave from "./components/ApplyLeave";
import ViewLeave from "./components/ViewLeave";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ManageUser from "./components/ManageUser";

const App = () => {
  const getToken = () => {
    const local = JSON.parse(localStorage.getItem("token"));
    if (local) {
      return local;
    } else {
      return "";
    }
  };
  const url = "https://hrms-server-hmfr.onrender.com"
  // const url = "http://localhost:1000";
  const [user, setuser] = useState(false);
  const [admin, setadmin] = useState(false);
  const [logininput, setlogininput] = useState({ email: "", password: "" });
  const [token, settoken] = useState(getToken());
  const [userId, setuserId] = useState("");
  const [user_Name, setuser_Name] = useState("")
  const [leaveinput, setleaveinput] = useState({
    lname: "",
    lnumber: "",
    lreason: "",
    ldate: "",
    lenddate: "",
    status: "pending",
  });
  const [alluserdetails, setalluserdetails] = useState([])
  const [leaveData, setleaveData] = useState([]);
  const [flage, setflage] = useState(0);
 
  useEffect(() => {
    const fetchUser = async () => {
      const api = await axios.get(`${url}/api/users`, {
        headers: { "Content-Type": "application/json"," auth": token },
        withCredentials: true,
      });

       setalluserdetails(api.data.alluser);
    };
     fetchUser();
    //  console.log(alluserdetails);
  }, [flage , token]);

  
   

  useEffect(() => {
    if (token) {
      const decode = jwtDecode(token);
      setuserId(decode.useId);
      setuser_Name(decode.name)
      // console.log(decode);
      if (decode.isType === "user") {
        setuser(true);
      
      } else {
        setuser(false);
      }
      if (decode.isType === "admin") {
        setadmin(true);
      } else {
     
        setadmin(false);
      }
    }
   
  }, [token]);

  // leave data

  useEffect(() => {
    const fetchLeavedata = async () => {
      const api = await axios.get(`${url}/api/leave`,
        {
          headers: { "Content-Type": "application/json", auth: token },
          withCredentials: true,
        }
      );
      setleaveData(api.data.data);
    };
  
    fetchLeavedata();
  }, [flage , token]);

  return (
    <>
      <Router>
        <ToastContainer />
        <Navbar
          token={token}
          setuser={setuser}
          setadmin={setadmin}
          setoken={settoken}
          user={user}
          admin={admin}
          user_Name={user_Name}
        />
        <Routes>
          <Route
            path="/login"
            element={
              <Login
              url={url}
                logininput={logininput}
                setlogininput={setlogininput}
                settoken={settoken}
                admin={admin}
                setadmin={setadmin}
                user={user}
                setuser={setuser}
                token={token}
                flage={flage}
                setflage={setflage}
              />
            }
          />
          <Route
            path="/"
            element={
              <Home
                alluserdetails={alluserdetails}
                userId={userId}
                user={user}
              />
            }
          />
          <Route path="/signup" element={<Signup url={url} />} />
          {/* <Route path="/admin" element={<Admin />} />
          <Route path="/admin" element={<Admin />} /> */}
          <Route
            path="/applyLeaves"
            element={
              <ApplyLeave
              url={url}
                token={token}
                leaveinput={leaveinput}
                setleaveinput={setleaveinput}
                flage={flage}
                setflage={setflage}
                userId={userId}
              />
            }
          />
          <Route
            path="/viewLeaves"
            element={
              <ViewLeave
              url={url}
                token={token}
                leaveData={leaveData}
                userId={userId}
                setflage={setflage}
                flage={flage}
                user={user}
                admin={admin}
                alluserdetails={alluserdetails}
              />
            }
          />

          <Route
            path="/users"
            element={
              <ManageUser
              url={url}
                alluserdetails={alluserdetails}
                admin={admin}
                setflage={setflage}
                flage={flage}
                token={token}
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
