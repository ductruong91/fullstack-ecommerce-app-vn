import React, { useEffect, useState } from "react";
import { IconButton, InputAdornment, TextField, Button } from "@mui/material";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Icon mắt
import styled from "styled-components";
import { useMutation } from "@tanstack/react-query";
import * as AdminService from "../../service/AdminService";
import * as message from "../../components/Message/Message";

const WrapperContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f7f8fc;
  height: 100vh;
`;

const WrapperForm = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const AvatarUpload = styled.label`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 120px;
  margin: 0 auto 20px;
  background-color: #ddd;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  input {
    display: none;
  }

  span {
    position: absolute;
    color: #555;
    font-size: 14px;
  }
`;

const AddAdminPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    address: "",
    phone: "",
    role: "admin",
    avatar: null,
  });

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [messageShown, setMessageShown] = useState(false); // Trạng thái hiển thị message

  const toggleShowPassword = () => setIsShowPassword(!isShowPassword);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // React Query Mutation
  const mutation = useMutation({
    mutationFn: (data) => AdminService.addAdmin(data),
    // onSuccess: () => message.success(),
    // onError: () => message.error(),
  });

  const { data, isSuccess } = mutation;

 useEffect(() => {
   if (data?.status === "success" && !messageShown) {
     message.success("tạo mới admin thành công");
     setMessageShown(true); // Cập nhật trạng thái đã hiển thị message
   }
 }, [data, messageShown]);


  const handleSubmit = () => {
    // const { password, confirmPassword } = formData;
    // console.log("data", formData);
    // if (password !== confirmPassword) {
    //   message.error("Mật khẩu không khớp!");
    //   return;
    // }

    mutation.mutate(formData);
    setMessageShown(false); // Reset trạng thái khi thực hiện mutation mới
  };

  return (
    <WrapperContainer>
      <WrapperForm>
        <h2 style={{ textAlign: "center" }}>Create Admin</h2>

        {/* Avatar Upload */}
        <AvatarUpload htmlFor="avatar">
          {formData.avatar ? (
            <img src={formData.avatar} alt="avatar" />
          ) : (
            <span>Upload Avatar</span>
          )}
          <input
            id="avatar"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </AvatarUpload>

        {/* Email */}
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />

        {/* Name */}
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />

        {/* Address */}
        <TextField
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />

        {/* Phone */}
        <TextField
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />

        {/* Password */}
        <TextField
          label="Password"
          name="password"
          type={isShowPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={toggleShowPassword}>
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

        {/* Confirm Password */}
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          type={isShowPassword ? "text" : "password"}
          value={formData.confirmPassword}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={toggleShowPassword}>
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
        {data?.status === "ERR" && (
          <span style={{ color: "red" }}>{data?.message}</span>
        )}

        {/* Submit Button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          style={{ marginTop: "20px" }}
        >
          Create Admin
        </Button>
      </WrapperForm>
    </WrapperContainer>
  );
};

export default AddAdminPage;
