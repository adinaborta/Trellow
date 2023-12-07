"use client";

import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {
  DialogContentText,
  FormControl,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
  styled,
} from "@mui/material";
import StyledButton from "./StyledButton";
import { useRouter } from "next/navigation";

export default function LoginForm({ changeForm }) {
  const emailRef = React.useRef();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = React.useState(null);
  const passwordRef = React.useRef();
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

  React.useEffect(() => {
    if (localStorage.getItem("userId")) {
      router.replace("/boards");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const res = await fetch(`http://localhost:4000/users/login`, {
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
      }),
    });
    if (res.status == 404) {
      setErrorMessage("The email and password combination is incorrect");
    } else {
      const user = await res.json();
      localStorage.setItem("userId", user.user_id);
      router.replace("/boards");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        hideBackdrop
        maxWidth="xs"
        fullWidth={true}
      >
        <div className="signup-form">
          <DialogTitle
            id="alert-dialog-title"
            style={{ background: "transparent", textAlign: "center" }}
          >
            LOGIN
          </DialogTitle>

          <DialogContent style={{ background: "transparent" }}>
            <DialogContentText style={{ textAlign: "center" }}>
              Welcome back! Log into your account.
            </DialogContentText>
            <div className="m-4"></div>
            <form onSubmit={handleLogin}>
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
                inputRef={passwordRef}
                variant="outlined"
                fullWidth
                required
              />
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
                Log in
              </StyledButton>
            </form>
            <div className="m-1"></div>
            <DialogContentText
              variant="caption"
              style={{ textAlign: "center" }}
            >
              Don't have an account yet?{" "}
              <span
                onClick={changeForm}
                style={{ cursor: "pointer", color: "#CDADFF" }}
              >
                Sign up
              </span>
            </DialogContentText>
          </DialogContent>
        </div>
      </Dialog>
    </ThemeProvider>
  );
}
