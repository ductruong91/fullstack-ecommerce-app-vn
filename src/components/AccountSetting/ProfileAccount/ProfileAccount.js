import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { updateUser } from "../../../redux/slides/userSlide";
import { Button, TextField } from "@mui/material";
import * as UserService from "../../../service/UserService";

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const AvatarWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #ddd;
  overflow: hidden;
  cursor: pointer;
`;

const AvatarButton = styled.label`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #ddd;
  overflow: hidden;
  cursor: pointer;
  margin-bottom: 20px;
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const UploadInput = styled.input`
  display: none;
`;
const AvatarChangeButton = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const ProfileAccount = () => {
  const user = useSelector((state) => state.user); // Lấy thông tin người dùng từ Redux store
  console.log("userid sau khi lay tt", user?.id);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone || "",
    address: user.address || "",
    avatar: user.avatar || "", // Avatar của người dùng
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevState) => ({
          ...prevState,
          avatar: reader.result, // Cập nhật avatar mới từ file chọn
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async () => {
    //update lên server
    await UserService.updateUser(user?.id, formData);

    // Cập nhật thông tin người dùng trong Redux
    const res = await UserService.getDetailUser(user.id, user.access_token);
    dispatch(updateUser({ ...res?.data, access_token: user.access_token }));

    alert("Thông tin đã được cập nhật!");
  };

  return (
    <ProfileWrapper>
      {/* Nút Avatar upload */}
      <AvatarButton htmlFor="avatar-upload">
        {formData.avatar ? (
          <AvatarImage src={formData.avatar} alt="Avatar" />
        ) : (
          <div style={{ color: "#fff", fontSize: "24px" }}>
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>
        )}
        <UploadInput
          id="avatar-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </AvatarButton>

      {/* Các trường thông tin người dùng */}
      <TextField
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        variant="outlined"
        disabled
      />
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Phone"
        name="phone"
        value={formData.phone}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Address"
        name="address"
        value={formData.address}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        variant="outlined"
      />

      {/* Nút cập nhật */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleUpdateProfile}
        style={{ marginTop: "20px" }}
      >
        Cập nhật
      </Button>
    </ProfileWrapper>
  );
};

export default ProfileAccount;
