import React from 'react'
import { Toolbar , AppBar , Avatar} from "@mui/material"
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Navbar = ({
  token,
  setuser,
  setadmin,
  setoken,
  user,
  admin,
  user_Name,
}) => {
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
        <Toolbar className=" d-flex  justify-content-between align-items-center">
          <div className="logo">
            <img src="/download.jpg" alt="" />
          </div>
          <div className="items d-flex gap-5 align-items-center">
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
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar