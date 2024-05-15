import React from 'react'
import { Box, Card, CardActionArea, CardActions } from "@mui/material"
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
                <Box
                  className="cards d-flex flex-wrap justify-content-center align-items-center
                  gap-3 "
                >
                  <Card
                    variant="outlined"
                    sx={{ width: { xs: "150px", md: "300px" } }}
                  >
                    <CardActionArea>
                      <CardActions
                        sx={{ height: "150px" }}
                        className="d-flex flex-column justify-content-center gap-2 "
                      >
                        <h2 style={{ textAlign: "center" }}>Total Leaves</h2>
                        <h3>{userLeaveCount[0].Total}</h3>
                      </CardActions>
                    </CardActionArea>
                  </Card>

                  <Card
                    variant="outlined"
                    sx={{ width: { xs: "150px", md: "300px" } }}
                  >
                    <CardActionArea>
                      <CardActions
                        sx={{ height: "150px" }}
                        className="d-flex flex-column justify-content-center gap-2 "
                      >
                        <h2 style={{ textAlign: "center" }}>
                          Available Leaves
                        </h2>
                        <h3>{userLeaveCount[0].Available}</h3>
                      </CardActions>
                    </CardActionArea>
                  </Card>
                  <Card
                    variant="outlined"
                    sx={{ width: { xs: "150px", md: "300px" } }}
                  >
                    <CardActionArea>
                      <CardActions
                        sx={{ height: "150px" }}
                        className="d-flex flex-column justify-content-center gap-2 "
                      >
                        <h2 style={{ textAlign: "center" }}>Accepted Leaves</h2>
                        <h3>{userLeaveCount[0].Accepted}</h3>
                      </CardActions>
                    </CardActionArea>
                  </Card>
                  <Card
                    variant="outlined"
                    sx={{ width: { xs: "150px", md: "300px" } }}
                  >
                    <CardActionArea>
                      <CardActions
                        sx={{ height: "150px" }}
                        className="d-flex flex-column justify-content-center gap-2 "
                      >
                        <h2 style={{ textAlign: "center" }}>Rejected Leave</h2>
                        <h3>{userLeaveCount[0].Rejected}</h3>
                      </CardActions>
                    </CardActionArea>
                  </Card>
                </Box>
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