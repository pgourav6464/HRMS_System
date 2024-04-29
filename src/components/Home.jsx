import React from 'react'
import { Card, CardActionArea, CardActions } from "@mui/material"
import { useState } from "react";
import { useEffect } from "react";

const Home = ({ alluserdetails ,userId ,user }) => {
  const [userLeaveCount, setuserLeaveCount] = useState([]);
  useEffect(() => {
   if (alluserdetails) {
     setuserLeaveCount(alluserdetails.filter((e) => e._id == userId));
   }

  //  console.log(userLeaveCount)
  }, [alluserdetails , user , userId])
  return (
    <>
      {user && (
        <>
          {userLeaveCount.length > 0 && (
            <>
              <div className="cardcontainer mt-3 ">
                <div className="cards d-flex justify-content-center align-items-center  gap-3 ">
                  <Card variant="outlined" sx={{ width: "300px" }}>
                    <CardActionArea>
                      <CardActions
                        sx={{ height: "200px" }}
                        className="d-flex flex-column justify-content-center gap-2 "
                      >
                        <h2>Total Leaves</h2>
                        <h3>{userLeaveCount[0].Total}</h3>
                      </CardActions>
                    </CardActionArea>
                  </Card>
                  <Card variant="outlined" sx={{ width: "300px" }}>
                    <CardActionArea>
                      <CardActions
                        sx={{ height: "200px" }}
                        className="d-flex flex-column justify-content-center gap-2 "
                      >
                        <h2>Available Leaves</h2>
                        <h3>{userLeaveCount[0].Available}</h3>
                      </CardActions>
                    </CardActionArea>
                  </Card>
                  <Card variant="outlined" sx={{ width: "300px" }}>
                    <CardActionArea>
                      <CardActions
                        sx={{ height: "200px" }}
                        className="d-flex flex-column justify-content-center gap-2 "
                      >
                        <h2>Accepted Leaves</h2>
                        <h3>{userLeaveCount[0].Accepted}</h3>
                      </CardActions>
                    </CardActionArea>
                  </Card>
                  <Card variant="outlined" sx={{ width: "300px" }}>
                    <CardActionArea>
                      <CardActions
                        sx={{ height: "200px" }}
                        className="d-flex flex-column justify-content-center gap-2 "
                      >
                        <h2>Rejected Leave</h2>
                        <h3>{userLeaveCount[0].Rejected}</h3>
                      </CardActions>
                    </CardActionArea>
                  </Card>
                </div>
              </div>
            </>
          )}
        </>
      )}

      <div className="home d-flex justify-content-center flex-wrap align-items-center">
        <img src="/h1.avif" alt="" />
        <img src="/h2.avif" alt="" />
        <img src="/h3.avif" alt="" />
      </div>
    </>
  );
};

export default Home