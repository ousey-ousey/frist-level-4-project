import { Close } from "@mui/icons-material";
import { Box, Paper, Typography, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";

function Home() {
  const [mydata, setmydata] = useState([]);
  const [render, setrender] = useState("");
  // const [totalmoney, settotalmoney] = useState(0);
  let totalmoney = 0;
  useEffect(() => {
    fetch("http://localhost:3100/mydata")
      .then((response) => response.json())
      .then((data) => setmydata(data));
  }, [render]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {mydata.map((item) => {
        totalmoney += item.value;
        return (
          <Paper
            sx={{
              width: "200px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "15px",
              mt: "20px",
              position: "relative",
            }}
            key={item.id}
          >
            <Typography variant="h7" color="inherit">
              {item.name}
            </Typography>
            <Typography variant="body1" color="inherit" sx={{ opacity: 0.8 }}>
              {item.value}$
            </Typography>
            <IconButton
              sx={{
                position: "absolute",
                width: "1.5rem",
                height: "1.5rem",
                color: "#f44336",
                right: "-5px",
                top: "-8px",
              }}
              onClick={() => {
                fetch(`http://localhost:3100/mydata/${item.id}`, {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  },
                }).then(() => {
                  setrender({ mydata });
                });
              }}
            >
              <Close sx={{ fontSize: "1.5rem" }} />
            </IconButton>
          </Paper>
        );
      })}
      <Typography variant="h6">you spent ${totalmoney}</Typography>
    </Box>
  );
}

export default Home;
