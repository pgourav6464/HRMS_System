import React from 'react'
import LoginFirst from './LoginFirst'
import { Button, TextField, Typography  } from "@mui/material"
import axios from 'axios';
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ApplyLeave = ({url, token, setleaveinput, leaveinput , flage,setflage , userId }) => {
  // console.log(token)

  const handler = (e)=>{
    const {name , value} = e.target
    setleaveinput({...leaveinput , [name]:value})
    // console.log(leaveinput)
  }
  const {lname,lnumber,lreason,ldate,lenddate,status} = leaveinput
  // console.log("leave" , userId)

  const applyLeave = async(
    lname,
    lnumber,
    lreason,
    ldate,
    lenddate,
    status,
    userId
  )=>{

    const api = await axios.post(
      `${url}/api/leave`,
      {
        lname,
        lnumber,
        lreason,
        ldate,
        lenddate,
        status,
        userId,
      },
      {
        headers: { "Content-Type": "application/json", auth: token },
        withCredentials: true,
      }
    );

  }

  const handlesubmit = (e)=>{
    e.preventDefault()
    // alert("")
    applyLeave(lname, lnumber, lreason, ldate, lenddate, status, userId);
    setleaveinput({
      lname: "",
      lnumber: "",
      lreason: "",
      ldate: "",
      lenddate: "",
      status: "pending",
    });
   
    
    setflage(flage + 1);
       toast.success("Application submited", {
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
  return (
    <>
      <div>
        {!token && <LoginFirst />}
        {token && (
          <>
            <div className="leaveform  d-flex justify-content-center align-items-center flex-column mt-3 ">
              <Typography variant="h3" color={"secondary"}>
                Apply Leaves
              </Typography>
              <form onSubmit={handlesubmit}
                action=""
                className=" d-flex justify-content-center align-items-center flex-column mt-3  gap-3  "
              >
                <TextField
                  label={"Name"}
                  name="lname"
                  onChange={handler}
                  value={leaveinput.lname}
                  sx={{ width: "400px" }}
                />
                <TextField
                  label={"Number"}
                  sx={{ width: "400px" }}
                  name="lnumber"
                  onChange={handler}
                  value={leaveinput.lnumber}
                />
                <TextField
                  label={"Reason"}
                  sx={{ width: "400px" }}
                  name="lreason"
                  onChange={handler}
                  value={leaveinput.lreason}
                />
                <TextField
                  sx={{ width: "400px" }}
                  type="date"
                  name="ldate"
                  onChange={handler}
                  value={leaveinput.ldate}
                />
                <TextField
                  placeholder="EndDAte"
                  sx={{ width: "400px" }}
                  type="date"
                  name="lenddate"
                  onChange={handler}
                  value={leaveinput.lenddate}
                />
                <Button
                onClick={handlesubmit}
                  variant="contained"
                  color="secondary"
                  sx={{ width: "400px" }}
                >
                  Submit
                </Button>
              </form>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ApplyLeave