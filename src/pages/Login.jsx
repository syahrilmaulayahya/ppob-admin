import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { loginFetch, loginSuccess } from "../redux/loginSlice";
import axios from "axios";
import { loginFailure } from "../redux/errorSlice";
import { useNavigate } from "react-router-dom";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Gesek.co
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bodyForm = new FormData();
  const { loginError } = useSelector((state) => state.error);
  

  const login = async (dispatch, user, navigate) => {
    dispatch(loginFetch(true));
    try {
      const res = await axios.post("https://api.stevenhoyo.co/v1/login", user);

      if (res.status === 204) {
        dispatch(loginFailure("204"));
        dispatch(loginFetch(false));
      } else {
        dispatch(loginSuccess(res.data));
        dispatch(loginFetch(false));
        navigate("/");
      }
    } catch (err) {
      if (err?.response?.status === 401) {
        dispatch(loginFailure("401"));
        dispatch(loginFetch(false));
      } else if (err?.response?.status === 400) {
        dispatch(loginFailure("400"));
        dispatch(loginFetch(false));
      } else {
        dispatch(loginFailure("unkown"));
        dispatch(loginFetch(false));
      }
    }
  };

  const [errMsg, setErrMsg] = React.useState({ email: "", password: "" });
  const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "email") {
      if (!value) {
        setErrMsg({ ...errMsg, [name]: "Email masih kosong" });
      } else if (!regexEmail.test(value)) {
        setErrMsg({ ...errMsg, [name]: "Format email salah" });
      } else {
        setErrMsg({ ...errMsg, [name]: "" });
        dispatch(loginFailure(null));
      }
      setEmail(e.target.value);
    }

    if (name === "password") {
      if (!value) {
        setErrMsg({ ...errMsg, [name]: "Password masih kosong" });
      } else {
        setErrMsg({ ...errMsg, [name]: "" });
      }
      setPassword(e.target.value);
    }
  };

  const handleSubmit = () => {
    if (email === "" && password === "") {
      setErrMsg({
        ...errMsg,
        email: "Email masih kosong",
        password: "Password masih kosong",
      });
    } else if (email === "") {
      setErrMsg({ ...errMsg, email: "Email masih kosong" });
    } else if (password === "") {
      setErrMsg({ ...errMsg, password: "Password masih kosong" });
    } else if (!errMsg.password && !errMsg.email) {
      bodyForm.append("email", email);
      bodyForm.append("password", password);
      login(dispatch, bodyForm, navigate);
    }
  };
  
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => handleChange(e)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => handleChange(e)}
            />
            <Typography sx={{ color: "error.main" }}>
              {errMsg.email
                ? errMsg.email
                : loginError === "204"
                ? "Email tidak ditemukan"
                : errMsg.password}
            </Typography>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={(event) => handleSubmit(event)}
            >
              Sign In
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
