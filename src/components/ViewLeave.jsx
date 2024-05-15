import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import LoginFirst from "./LoginFirst";
import { useState } from "react";
import { useEffect } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function ViewLeave({
  url,
  leaveData,
  userId,
  flage,
  setflage,
  token,
  user,
  admin,
  alluserdetails,
}) {
  const [data, setdata] = useState([]);
  const [ud, setud] = useState("")
  const [status, setstatus] = useState("")
  
  useEffect(() => {
    if (leaveData) {
      setdata(leaveData.filter((e) => e.userId == userId));
    }
  }, [leaveData , flage]);

  const cancelrequest = async (id) => {
    const api = await axios.delete(`${url}/api/leave/${id}` , {
      headers: { "Content-Type": "application/json", auth: token },
      withCredentials: true,
    });
   setflage(flage+1)

    toast.success("Request cancel", {
      position: "top-right",
      autoClose: 2001,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

//  useeffect for chnage value
  useEffect(() => {
    const changeNumber = async (id, Available,  Accepted,Rejected) => {           
      const api = await axios.put(
        `${url}/api/users/${id}`,
        { Accepted, Available, Rejected },
        {
          headers: { "Content-Type": "application/json", auth: token },
          withCredentials: true,
        }
      );
    };
    if(alluserdetails){
       var filterdata = alluserdetails.filter((e) => e._id == ud);
       }
         if (status == "Approved") {
           let { Available, Accepted, Rejected } = filterdata[0];
           if ((Available > 0) & (Available < 11)) {
             Available = Available - 1;
             Accepted = Accepted + 1;
             changeNumber(ud, Available, Accepted, Rejected);
             setstatus("");
           }
         }
         if (status == "Rjected") {
           let { Available, Accepted, Rejected } = filterdata[0];
           if (Available > 0 && Available < 11) {
            //  Available = Available - 1;
             Rejected = Rejected + 1;
             changeNumber(ud, Available, Accepted, Rejected);
             setstatus("");
           }
         }
  
  }, [status])
  
  
// edit leave status
  const editLeave = async (id, status , uud ) => {
     setud(uud);
     setstatus(status)
     const api = await axios.put(
       `http://localhost:1000/api/leave/${id}`,
       { status },
       {
         headers: { "Content-Type": "application/json", auth: token },
         withCredentials: true,
       }
     );
    if (status == "Approved") { 
      toast.success("Request Approved", {
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
      // setAvailable(available - 1);
      // setrj(rj + 1);
      toast.success("Request Rejected", {
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
    setflage(flage + 1)

// console.log(api)
  };

  return (
    <>
      {!token && <LoginFirst />}
      {user && (
        <>
          <Typography align="center" variant="h3" sx={{ margin: "30px" }}>
            Views Leaves Application 
          </Typography>

          {/*  */}
          <TableContainer component={Paper} >
            <Table sx={{ minWidth: 650  }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    <h6>Name</h6>
                  </TableCell>
                  <TableCell align="center">
                    <h6>Number</h6>
                  </TableCell>
                  <TableCell align="center">
                    <h6>Reason</h6>
                  </TableCell>
                  <TableCell align="center">
                    <h6>Start-date</h6>
                  </TableCell>
                  <TableCell align="center">
                    <h6>End-date</h6>
                  </TableCell>
                  <TableCell align="center">
                    <h6>Status</h6>
                  </TableCell>
                  <TableCell align="center">
                    <h6>Cancel-Request</h6>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow
                    key={Math.random()}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="center">
                      {row.lname}
                    </TableCell>
                    <TableCell align="center">{row.lnumber}</TableCell>
                    <TableCell align="center">{row.lreason}</TableCell>
                    <TableCell align="center">{row.ldate}</TableCell>
                    <TableCell align="center">{row.lenddate}</TableCell>
                    <TableCell align="center">{row.status}</TableCell>
                    <TableCell align="center">
                      <Button onClick={() => cancelrequest(row._id)}>
                        Cancel
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
      {admin && (
        <>
          <Typography align="center" variant="h3" sx={{ margin: "30px" }}>
            Manage Leaves Application
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    <h6>Name</h6>
                  </TableCell>
                  <TableCell align="center">
                    <h6>Number</h6>
                  </TableCell>
                  <TableCell align="center">
                    <h6>Reason</h6>
                  </TableCell>
                  <TableCell align="center">
                    <h6>Start-date</h6>
                  </TableCell>
                  <TableCell align="center">
                    <h6>End-date</h6>
                  </TableCell>
                  <TableCell align="center">
                    <h6>Status</h6>
                  </TableCell>
                  <TableCell align="center">
                    <h6>Action</h6>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaveData && (
                  <>
                    {leaveData.map((row) => (
                      <TableRow
                        key={Math.random()}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row" align="center">
                          {row.lname}
                        </TableCell>
                        <TableCell align="center">{row.lnumber}</TableCell>
                        <TableCell align="center">{row.lreason}</TableCell>
                        <TableCell align="center">{row.ldate}</TableCell>
                        <TableCell align="center">{row.lenddate}</TableCell>
                        <TableCell align="center">{row.status}</TableCell>
                        <TableCell align="center">
                          <Box className="d-flex">
                            <Button
                              sx={{ marginRight: "10px" }}
                              color="success"
                              size="small"
                              variant="outlined"
                              onClick={() =>
                                editLeave(row._id, "Approved", row.userId)
                              }
                            >
                              Approve
                            </Button>
                            <Button
                              color="error"
                              variant="outlined"
                              size="small"
                              onClick={() =>
                                editLeave(row._id, "Rjected", row.userId)
                              }
                            >
                              Reject
                            </Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
}
