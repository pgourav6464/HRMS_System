import React from 'react'
import { Link } from 'react-router-dom'


const LoginFirst = () => {
  return (
    <div style={{height:"400px" }} className=" d-flex justify-content-center align-items-center flex-column " >
      <h1>Login First</h1>
      <Link className='btn btn-warning' to={"/login"}>Login</Link>
    </div>
  );
}

export default LoginFirst