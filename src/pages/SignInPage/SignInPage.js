import React from "react";
import {
  WrapperContainerLogin,
  WrapperSignInButton,
  WrapperTexSignIn,
} from "./style";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { TextField } from "@mui/material";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

const SignInPage = () => {
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
          <TextField
            id="outlined-basic"
            label="tai khoan"
            variant="outlined"
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ paddingTop: " 20px" }}>
          <TextField
            id="outlined-basic"
            label="mat khau"
            variant="outlined"
            style={{ width: "100%" }}
          />
        </div>
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
        <div style={{ display: 'flex', justifyContent: 'center'}}>
          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "blue",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Đăng kí tài khoản mới
          </button>
        </div>
      </WrapperContainerLogin>
    </div>
  );
};

export default SignInPage;
