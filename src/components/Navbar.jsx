import React from 'react'
import { Toolbar , AppBar , Avatar ,Box , Drawer, colors} from "@mui/material"
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMenu } from "react-icons/io5";
import { ImCancelCircle } from "react-icons/im";
import { useState } from 'react';


const Navbar = ({
  token,
  setuser,
  setadmin,
  setoken,
  user,
  admin,
  user_Name,
}) => {
  const [menu, setmenu] = useState(false)
  const navigate = useNavigate();
  // console.log(user);
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setadmin(false);
    setuser(false);
    setoken(false);
      toast.success("!!!Logout!!!", {
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
  };
  return (
    <>
      <AppBar position="sticky" sx={{ bgcolor: "black" }}>
        <Toolbar className=" d-flex  justify-content-between align-items-center ">
          <div className="logo">
            <img src="/download.jpg" alt="" />
          </div>

          <Box
            sx={{ display: { xs: "none", md: "flex" } }}
            className="items gap-5 align-items-center"
          >
            <Link to={"/"}>
              <h6>Home</h6>
            </Link>
            {admin && (
              <>
                <Link to={"/viewLeaves"}>
                  <h6>Manage-Leaves</h6>{" "}
                </Link>
                <Link to={"/users"}>
                  <h6>manage-Users</h6>{" "}
                </Link>
                <h6>{user_Name}</h6>
                <h6>Admin</h6>
                {/* <h6></h6> */}
                <h6 onClick={logout}>Logout</h6>
              </>
            )}

            {user && (
              <>
                <Link to={"/applyLeaves"}>
                  <h6>Apply-Leaves</h6>{" "}
                </Link>
                <Link to={"/viewLeaves"}>
                  <h6>View-Leaves</h6>{" "}
                </Link>
                <h6>{user_Name}</h6>
                <h6 onClick={logout}>Logout</h6>
              </>
            )}

            {!token && (
              <>
                <Link to={"/signup"}>
                  <h6>Signup</h6>{" "}
                </Link>
                <Link to={"/login"}>
                  <h6>Login</h6>{" "}
                </Link>
              </>
            )}
          </Box>
          <Box
            onClick={() => setmenu(true)}
            sx={{ display: { sx: "block", md: "none", cursor: "pointer" } }}
          >
            <IoMenu size={30} />
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor={"top"} open={menu}>
        <Box
          sx={{ cursor: "pointer" }}
          onClick={() => setmenu(false)}
          className="items bg-black d-flex justify-content-center flex-column gap-5 p-5 align-items-center"
        >
          <ImCancelCircle
            size={30}
            color="white"
            style={{ position: "fixed", right: "30px", top: "30" }}
          />

          <Link to={"/"}>
            <h5>Home</h5>
          </Link>
          {admin && (
            <>
              <Link to={"/viewLeaves"}>
                <h5>Manage-Leaves</h5>{" "}
              </Link>
              <Link to={"/users"}>
                <h5>manage-Users</h5>{" "}
              </Link>
              <h5>{user_Name}</h5>
              <h5>Admin</h5>
              {/* <h6></h6> */}
              <h5 style={{ colors: "white" }} onClick={logout}>
                Logout
              </h5>
            </>
          )}

          {user && (
            <>
              <Link to={"/applyLeaves"}>
                <h5>Apply-Leaves</h5>{" "}
              </Link>
              <Link to={"/viewLeaves"}>
                <h5>View-Leaves</h5>{" "}
              </Link>
              <h5>{user_Name}</h5>
              <h5 style={{ colors: "white" }} onClick={logout}>
                Logout
              </h5>
            </>
          )}

          {!token && (
            <>
              <Link to={"/signup"}>
                <h5>Signup</h5>{" "}
              </Link>
              <Link to={"/login"}>
                <h5>Login</h5>{" "}
              </Link>
            </>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar