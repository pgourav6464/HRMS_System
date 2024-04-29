import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Typography  , Modal , Box, TextField} from "@mui/material";
import axios from "axios";
import LoginFirst from "./LoginFirst";
import { useState } from "react";
import { useEffect } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageUser = ({alluserdetails, admin, setflage, flage, token , url}) => {
//   console.log(flage);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [username, setusername] = useState("");
  const [Total, setTotal] = useState("");
  const [Available, setAvailable] = useState("");
  const [userid, setUserid] = useState("");
  const [open, setopen] = useState(false);
  const [filterData, setfilterData] = useState([])


   useEffect(() => {
     if (alluserdetails) {
        setfilterData(alluserdetails.filter(
         (e) => e.isType != "admin"
       ))

    }
   }, [open , flage , userid , alluserdetails]);
//    console.log(alluserdetails)

// console.log(flage)
   
 

// edit user
  const editUser = async (id, name, username, email, Available, Total) => {
    const api = await axios.put(
      `${url}/api/users/${id}`,
      { name, username, email, Available, Total },
      {
        headers: { "Content-Type": "application/json", auth: token },
        withCredentials: true,
      }
    );
  
    // console.log(api);
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
    setflage(flage + 1);
  };

//   delete user
  const deleteUser = async (id) => {
    const api = await axios.delete(`${url}/api/users/${id}`, {
      headers: { "Content-Type": "application/json", auth: token },
      withCredentials: true,
    });
    // console.log(api);
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
    setflage(flage + 1);
  };


  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const editSubmit = () => {
    editUser(userid, name, username, email, Available, Total);
    setopen(false);
    setUserid("")
  
  };
//   console.log(flage)
  const edithandle = (id) => {
    setflage(flage + 1);
    setUserid(id);
    setopen(true);
    const data = alluserdetails.filter((e)=>e._id==id)
    setname(data[0].name)
    setusername(data[0].username)
    setemail(data[0].email)
    setTotal(data[0].Total)
    setAvailable(data[0].Available)
  };

  return (
    <>
      {admin && (
        <>
          <Typography align="center" variant="h3" sx={{ margin: "30px" }}>
            Manage Leaves Users
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    <h6>Name</h6>
                  </TableCell>
                  <TableCell align="center">
                    <h6>UserName</h6>
                  </TableCell>
                  <TableCell align="center">
                    <h6>Email</h6>
                  </TableCell>
                  <TableCell align="center">
                    <h6>Total-Leaves</h6>
                  </TableCell>
                  <TableCell align="center">
                    <h6>Available-Leaves</h6>
                  </TableCell>
                  <TableCell align="center">
                    <h6>Action</h6>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {alluserdetails && (
                  <>
                    {filterData.map((row) => (
                      <TableRow
                        key={Math.random()}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row" align="center">
                          {row.name}
                        </TableCell>
                        <TableCell align="center">{row.username}</TableCell>
                        <TableCell align="center">{row.email}</TableCell>
                        <TableCell align="center">{row.Total}</TableCell>
                        <TableCell align="center">{row.Available}</TableCell>

                        <TableCell align="center">
                          <Button
                            sx={{ marginRight: "10px" }}
                            color="warning"
                            size="small"
                            variant="contained"
                            onClick={() => edithandle(row._id)}
                          >
                            Edit
                          </Button>
                          <Button
                            color="error"
                            variant="contained"
                            size="small"
                            onClick={() =>
                              deleteUser(row._id)
                            }
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Modal
            open={open}
            // onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              className=" d-flex justify-content-center flex-column gap-3"
              sx={style}
            >
              <TextField
                label="name"
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
              <TextField
                label="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
              <TextField
                label="username"
                value={username}
                onChange={(e) => setusername(e.target.value)}
              />
              <TextField
                label="Total-leaves"
                value={Total}
                onChange={(e) => setTotal(e.target.value)}
              />
              <TextField
                label="Available-leaves"
                value={Available}
                onChange={(e) => setAvailable(e.target.value)}
              />
              <Box className=" d-flex gap-3 justify-content-center">
                {" "}
                <Button variant="contained" onClick={editSubmit}>
                  Submit
                </Button>{" "}
                <Button
                  onClick={() => setopen(false)}
                  color="error"
                  variant="contained"
                >
                  Cancel
                </Button>{" "}
              </Box>
            </Box>
          </Modal>
        </>
      )}
    </>
  );
};

export default ManageUser;
