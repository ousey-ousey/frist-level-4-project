import { Paid, PlayArrow, Receipt } from "@mui/icons-material";
import { Box, Button, InputAdornment, TextField, styled } from "@mui/material";
import { green } from "@mui/material/colors";
import React from "react";
import { useForm } from "react-hook-form";

function Creat() {
  const [name, setName] = React.useState("");
  const [masseage, setMasseage] = React.useState("");
  const [value, setValue] = React.useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  }));

  const onSubmit = ({ name, value }) => {
    value = Number(value);
    fetch("http://localhost:3100/mydata", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, value }),
    }).then(() => {
      setMasseage("Done!");
      setTimeout(() => {
        setMasseage("");
      }, 1000);
    });
    setName("");
    setValue("");
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Transaction Title"
        sx={{ m: "5px 1px", display: "block" }}
        fullWidth
        {...register("name", {
          required: { value: true, message: "transaction name is reqired" },
          minLength: { value: 3, message: "length must be more than 3" },
        })}
        value={name}
        error={Boolean(errors.name)}
        helperText={
          Boolean(errors.name) ? errors.name?.message.toString() : null
        }
        onChange={(e) => setName(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Receipt />
            </InputAdornment>
          ),
        }}
        variant="filled"
      />
      <TextField
        label="Price"
        fullWidth
        type="number"
        {...register("value", {
          required: { value: true, message: "price is reqired" },
        })}
        sx={{ m: "10px 1px", display: "block" }}
        error={Boolean(errors.value)}
        helperText={
          Boolean(errors.value) ? errors.value?.message.toString() : null
        }
        onChange={(e) => setValue(Number(e.target.value))}
        value={value}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Paid />
            </InputAdornment>
          ),
        }}
        variant="filled"
      />
      <ColorButton type="submit" variant="contained">
        Submit <PlayArrow />
      </ColorButton>
      {masseage && <div style={{ color: green[500] }}>{masseage}</div>}
    </Box>
  );
}

export default Creat;
