import axios from "axios";
export const axiosJWT = axios.create();

export const getAllOrder = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_KEY}/order/get-all-order`
  );
  return res.data;
};

//id order
export const getOrderById = async (id) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_KEY}/order/detail/${id}`
  );
  return res.data;
};

export const createOrder = async (dataOrder) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_KEY}/Order/create`,
    dataOrder
  );
  return res.data;
};

//id nguoi mua
export const getBuyUserOrders = async (id) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_KEY}/order/get-buy-user-order/${id}`
  );
  return res.data;
};

//id nguoi ban
export const getSellUserOrders = async (id) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_KEY}/order/get-sell-user-order/${id}`
  );
  return res.data;
};

//truyen vao day la order bao gom ca _id
export const updateOrder = async (order) => {
  const res = await axios.put(
    `${process.env.REACT_APP_API_KEY}/order/update/${order._id}`,
    order
  );
  return res.data;
};

//id order
export const deleteOrder = async (id, access_token) => {
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_API_KEY}/order/delete/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getAllOrderWithBuyerAndSellerInf = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_KEY}/order/get-all-order-populate`
  );
  return res.data;
};
