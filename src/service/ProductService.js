import axios from "axios";
export const axiosJWT = axios.create();

export const getAllProduct = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_KEY}/product/get-all-product`
  );
  return res.data;
};

export const getAllFilteredProduct = async (
  query = {},
  limit = 2,
  page = 0
) => {
  // Gộp các query parameters với limit và page
  const params = {
    ...query, // Truyền query parameters tại đây
    limit, // Giới hạn số sản phẩm mỗi trang
    page, // Trang hiện tại
  };

  const res = await axios.get(
    `${process.env.REACT_APP_API_KEY}/product/get-all-product`,
    {
      params,
    }
  );
  return res.data;
};

export const getDetailProduct = async (id) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_KEY}/product/detail/${id}`
  );
  return res.data;
};

export const createPostProduct = async (dataProduct) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_KEY}/product/create`,
    dataProduct
  );
  return res.data;
};

export const getUserProduct = async (id) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_KEY}/product/get-user-product/${id}`
  );
  return res.data;
};

export const updateProduct = async (product) => {
  const res = await axios.put(
    `${process.env.REACT_APP_API_KEY}/product/update/${product._id}`,
    product
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
