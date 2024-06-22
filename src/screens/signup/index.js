import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import styled from "@emotion/styled";
import { apiUser } from "../../axios/user";
import { useNavigate } from "react-router-dom";

const RoundedCard = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
  max-width: 450px;
  padding: 24px;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const RoundedContainer = styled(Stack)`
  height: 100vh;
  background: linear-gradient(135deg, #f6f6f6, #e9e9e9);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignUpScreen = () => {
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [nicknameError, setNicknameError] = React.useState(false);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [nickname, setNickname] = React.useState("");

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleNickname = (event) => {
    setNickname(event.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    //   nickname: data.get("nickname"),
    // });

    if (!emailError && !passwordError && !passwordError) {
      apiUser.addUser(email, password, nickname).then(() => {
        alert("회원가입 완료!");
        navigate("/signin");
      });
    }
  };

  const validateInputs = () => {
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const nickname = document.getElementById("nickname");

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      isValid = false;
    } else {
      setEmailError(false);
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      isValid = false;
    } else {
      setPasswordError(false);
    }

    if (!nickname.value || nickname.value.length < 4) {
      setNicknameError(true);
      isValid = false;
    } else {
      setNicknameError(false);
    }

    return isValid;
  };

  return (
    <RoundedContainer>
      <RoundedCard>
        <Typography variant="h4" component="h1" align="center">
          Sign up
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
          }}
        >
          <FormControl>
            <FormLabel htmlFor="email" sx={{ textAlign: "left" }}>
              Email
            </FormLabel>
            <TextField
              error={emailError}
              id="email"
              type="email"
              name="email"
              placeholder="your@email.com"
              autoComplete="email"
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={emailError ? "error" : "primary"}
              onChange={handleEmail}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password" sx={{ textAlign: "left" }}>
              Password
            </FormLabel>
            <TextField
              error={passwordError}
              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              autoComplete="current-password"
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={passwordError ? "error" : "primary"}
              onChange={handlePassword}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="nickname" sx={{ textAlign: "left" }}>
              nickname
            </FormLabel>
            <TextField
              error={nicknameError}
              name="nickname"
              placeholder="nickname"
              type="text"
              id="nickname"
              autoComplete="nickname"
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={nicknameError ? "error" : "primary"}
              onChange={handleNickname}
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={validateInputs}
          >
            Sign up
          </Button>
        </Box>
      </RoundedCard>
    </RoundedContainer>
  );
};

export default SignUpScreen;
