import axios from "axios";
export const axiosJWT = axios.create();

export const getAllProduct = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_KEY}/product/get-all-product`
  );
  return res.data;
};

export const getAllProductForAdmin = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_KEY}/product/get-all-product-admin`
  );
  return res.data;
};

export const getAllUser = async (access_token) => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_API_KEY}/user/get-all-user`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const deleteUser = async (id, access_token) => {
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_API_KEY}/user/delete-user/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const deleteProduct = async (id, access_token) => {
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_API_KEY}/product/delete/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

//goij chung api sign up, tuy nhien data co 1 chut khac, do laf role = admin
export const addAdmin = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_KEY}/user/sign-up`,
    data
  );
  return res.data;
};
