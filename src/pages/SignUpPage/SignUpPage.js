import React, { useEffect, useState } from "react";
import {
  WrapperContainerLogin,
  WrapperSignInButton,
  WrapperTexSignIn,
} from "./style";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Icon mắt
import InputForm from "../../components/InputForm/InputFrom";
import * as UserService from "../../service/UserService";
import { useMutation } from "@tanstack/react-query";
import * as message from "../../components/Message/Message";

const SignUpPage = () => {
  const mutation = useMutation({
    mutationFn: (data) => UserService.signupUser(data),
  });

  const { data, isSuccess } = mutation;

  useEffect(() => {
    if (data?.status === "success") {
      message.success();
    }
  });

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [password, setPassword] = useState(""); // Trạng thái mật khẩu
  const [confirmPassword, setConfirmPassword] = useState(""); // Trạng thái mật khẩu
  const [email, setEmail] = useState(""); // Trạng thái email
  const [name, setName] = useState("");
  // Hàm để điều khiển hiển thị mật khẩu
  const handleTogglePassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const handleClickSignUp = () => {
    mutation.mutate({ email, name, password, confirmPassword });
    console.log("thong tin:", email, name, password, confirmPassword);
  };

  const navigate = useNavigate();
  const handleNavigateSignUp = () => {
    navigate("/signin");
  };
  return (
    <div
      style={{
        display: "flex",
        padding: "20px",
        alignItems: "center",
        justifyContent: "center",
        background: "#ccc",
        height: "100vh",
      }}
    >
      <WrapperContainerLogin>
        <WrapperTexSignIn>signup</WrapperTexSignIn>
        <div
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            fontSize: "30px",
            marginBottom: "20px",
          }}
        >
          <FaFacebook />
          <FcGoogle />
        </div>
        <div style={{ paddingTop: " 20px" }}>
          <InputForm
            id="outlined-basic"
            label="email"
            variant="outlined"
            style={{ width: "100%" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div style={{ paddingTop: " 20px" }}>
          <InputForm
            id="outlined-basic"
            label="tên của bạn"
            variant="outlined"
            style={{ width: "100%" }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div style={{ paddingTop: " 20px" }}>
          <TextField
            id="outlined-basic"
            label="mat khau"
            variant="outlined"
            style={{ width: "100%" }}
            type={isShowPassword ? "text" : "password"} // Thay đổi type khi ẩn/hiện mật khẩu
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Điều khiển trạng thái mật khẩu
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword}>
                    {isShowPassword ? (
                      <AiOutlineEyeInvisible />
                    ) : (
                      <AiOutlineEye />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>

        <div style={{ paddingTop: " 20px" }}>
          <InputForm
            id="outlined-basic"
            label="confirm mat khau"
            variant="outlined"
            style={{ width: "100%" }}
            type={isShowPassword ? "text" : "password"} // Thay đổi type khi ẩn/hiện mật khẩu
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} // Điều khiển trạng thái mật khẩu
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword}>
                    {isShowPassword ? (
                      <AiOutlineEyeInvisible />
                    ) : (
                      <AiOutlineEye />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
        {data?.status === "ERR" && (
          <span style={{ color: "red" }}>{data?.message}</span>
        )}

        <WrapperSignInButton>
          <ButtonComponent
            onClick={handleClickSignUp}
            size={40}
            styleButton={{
              background: "rgb(255,57,69)",
              height: "48px",
              width: "220px",
              borderRadius: "4px",
            }}
            textButton={"Sign up"}
            styleTextButton={{
              color: "#fff",
              fontSize: "20px",
              fontWeight: "500",
            }}
          ></ButtonComponent>
        </WrapperSignInButton>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "blue",
              cursor: "pointer",
              fontSize: "16px",
            }}
            onClick={handleNavigateSignUp}
          >
            Đăng nhập
          </button>
        </div>
      </WrapperContainerLogin>
    </div>
  );
};

export default SignUpPage;
