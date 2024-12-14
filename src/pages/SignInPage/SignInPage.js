import React, { useState } from "react";
import {
  WrapperContainerLogin,
  WrapperSignInButton,
  WrapperTexSignIn,
} from "./style";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { Navigate, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Icon mắt
import InputForm from "../../components/InputForm/InputFrom";
import { useMutation } from "@tanstack/react-query";
import * as UserService from "../../service/UserService";

const SignInPage = () => {
  const mutation = useMutation({
    mutationFn: (data) => UserService.loginUser(data),
  });
  const { data, isLoading } = mutation;
  console.log("mutation", mutation);

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [password, setPassword] = useState(""); // Trạng thái mật khẩu
  const [email, setEmail] = useState("");

  // Hàm để điều khiển hiển thị mật khẩu
  const handleTogglePassword = () => {
    setIsShowPassword(!isShowPassword);
  };
  // const handleOnChangeEmail = (e) => {
  //   setEmail(e.target.value);
  //   console.log("email:", e.target.value);
  // };
  const handleClickSignUp = () => {
    mutation.mutate({ email, password });
    console.log("in:", email, password);
  };
  const navigate = useNavigate();
  const handleNavigateSignUp = () => {
    navigate("/signup");
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
        <WrapperTexSignIn>signin</WrapperTexSignIn>
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
            // handleOnChange={handleOnChangeEmail}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div style={{ paddingTop: " 20px" }}>
          <InputForm
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
        {data?.status === "ERR" && (
          <span style={{ color: "red" }}>{data?.message}</span>
        )}
        <div
          style={{
            color: "blue", // Màu chữ xanh
            fontSize: "14px", // Cỡ chữ 14px
            cursor: "pointer", // Thêm con trỏ chuột kiểu "pointer" khi di chuột vào
            paddingTop: " 10px",
          }}
        >
          Quen mat khau?
        </div>
        <WrapperSignInButton>
          <ButtonComponent
            onClick={handleClickSignUp}
            disabled={false}
            size={40}
            styleButton={{
              background: "rgb(255,57,69)",
              height: "48px",
              width: "220px",
              borderRadius: "4px",
            }}
            textButton={"Sign in"}
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
            Đăng kí tài khoản mới
          </button>
        </div>
      </WrapperContainerLogin>
    </div>
  );
};

export default SignInPage;
