"use client";

import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {
  DialogContentText,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
  styled,
} from "@mui/material";
import StyledButton from "./StyledButton";
import { toast } from "react-toastify";

export default function SignupForm({ changeForm }) {
  const nameRef = React.useRef();
  const usernameRef = React.useRef();
  const [errorMessage, setErrorMessage] = React.useState(null);
  const emailRef = React.useRef();
  const passwordRef = React.useRef();
  const repeatPasswordRef = React.useRef();
  const CssTextField = styled(TextField)({
    "& label.Mui-focused": {
      color: "#fff",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#fff",
      },
      "&:hover fieldset": {
        borderColor: "#fff",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#8068a6",
      },
    },
  });
  const theme = createTheme({
    palette: {
      primary: {
        main: "#CDADFF",
        light: "#CDADFF",
        dark: "#CDADFF",
        contrastText: "#CDADFF",
      },
      secondary: {
        main: "#fff",
        light: "#fff",
        dark: "#fff",
        contrastText: "#fff",
      },
    },
  });

  const handleSignup = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;

    const password = passwordRef.current.value;
    const repeatPassword = repeatPasswordRef.current.value;
    const name = nameRef.current.value;
    const username = usernameRef.current.value;
    if (password != repeatPassword) {
      toast("The passwords need to match!", { theme: "dark", type: "warning" });

      return;
    }
    const res = await fetch(`http://localhost:4000/users/signup`, {
      next: {
        revalidate: 0,
      },
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
        username: username,
      }),
    });
    if (res.status == 500) {
      setErrorMessage("There was an error. Please try again later.");
    } else if (res.status == 400) {
      const result = await res.json();
      setErrorMessage(result.message);
    } else {
      toast("Account created. Log in!", { theme: "dark" });
      changeForm();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        maxWidth="sm"
        open={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        hideBackdrop
      >
        <div className="signup-form">
          <DialogTitle
            id="alert-dialog-title"
            style={{ background: "transparent", textAlign: "center" }}
          >
            SIGNUP
          </DialogTitle>

          <DialogContent style={{ background: "transparent" }}>
            <DialogContentText style={{ textAlign: "center" }}>
              Welcome! Create an account.
            </DialogContentText>{" "}
            <div className="m-4"></div>
            <form onSubmit={handleSignup}>
              <CssTextField
                id="name"
                label="Name"
                inputRef={nameRef}
                variant="outlined"
                style={{ marginRight: "0.5rem" }}
                required
              />
              <CssTextField
                id="username"
                label="Username"
                inputRef={usernameRef}
                variant="outlined"
                style={{ marginLeft: "0.5rem" }}
                required
              />
              <div className="m-4"></div>
              <CssTextField
                id="email"
                label="Email"
                inputRef={emailRef}
                variant="outlined"
                fullWidth
                required
              />
              <div className="m-4"></div>
              <CssTextField
                id="password"
                label="Password"
                style={{ marginRight: "0.5rem" }}
                inputRef={passwordRef}
                variant="outlined"
                required
              />
              <CssTextField
                id="repeat-password"
                label="Repeat Password"
                style={{ marginLeft: "0.5rem" }}
                inputRef={repeatPasswordRef}
                variant="outlined"
                required
              />
              <br></br>
              {errorMessage && (
                <Typography
                  className="mt-4"
                  style={{ color: "#de5b5b" }}
                  variant={errorMessage}
                >
                  {errorMessage}
                </Typography>
              )}
              <div className="m-4"></div>
              <StyledButton
                size="large"
                themeProp={theme}
                className={"login-button"}
                variant={"contained"}
              >
                Sign up
              </StyledButton>
            </form>
            <div className="m-1"></div>
            <DialogContentText
              variant="caption"
              style={{ textAlign: "center" }}
            >
              Already have an account?{" "}
              <span
                onClick={changeForm}
                style={{ cursor: "pointer", color: "#CDADFF" }}
              >
                Log in
              </span>
            </DialogContentText>
          </DialogContent>
        </div>
      </Dialog>
    </ThemeProvider>
  );
}
