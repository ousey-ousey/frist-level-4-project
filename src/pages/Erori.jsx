import { Box, useTheme, Typography } from "@mui/material";
import React from "react";

function Erori() {
  const theme = useTheme();
  return (
    <Box>
      <Typography variant="h4" color={theme.palette.error.main}>
        {" "}
        NOT FOUND
      </Typography>
    </Box>
  );
}

export default Erori;
