import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import * as OrderService from "../../service/OrderService";
import * as AdminService from "../../service/AdminService";

// Đăng ký các thành phần cần thiết cho Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const [orderData, setOrderData] = useState([]);
  const [productData, setProductData] = useState([]);

  // Fetch dữ liệu từ server
  useEffect(() => {
    const fetchData = async () => {
      // Lấy danh sách đơn hàng
      const orderRes = await OrderService.getAllOrderWithBuyerAndSellerInf();
      setOrderData(orderRes.data);

      // Lấy danh sách sản phẩm
      const productRes = await AdminService.getAllProductForAdmin();
      setProductData(productRes.data);
    };

    fetchData();
  }, []);

  // Dữ liệu cho biểu đồ stacking
  const processOrderData = () => {
    const monthlyData = {}; // { Jan: { completed: 5, pending: 10 } }

    orderData.forEach((order) => {
      const createdAt = new Date(order.createdAt);
      const month = `${createdAt.getFullYear()}-${createdAt.getMonth() + 1}`;

      if (!monthlyData[month]) {
        monthlyData[month] = { completed: 0, pending: 0 };
      }

      if (order.status === "completed") {
        monthlyData[month].completed++;
      } else {
        monthlyData[month].pending++;
      }
    });

    const labels = Object.keys(monthlyData).sort(); // Các tháng
    const completedData = labels.map((month) => monthlyData[month].completed);
    const pendingData = labels.map((month) => monthlyData[month].pending);

    return {
      labels,
      datasets: [
        {
          label: "Đã hoàn thành",
          data: completedData,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
        {
          label: "Đang xử lý",
          data: pendingData,
          backgroundColor: "rgba(153, 102, 255, 0.6)",
        },
      ],
    };
  };

  // Dữ liệu cho biểu đồ tròn
  const processProductData = () => {
    const productTypeCounts = {}; // { "Type A": 10, "Type B": 5 }

    productData.forEach((product) => {
      const type = product.type || "Unknown";
      productTypeCounts[type] = (productTypeCounts[type] || 0) + 1;
    });

    const labels = Object.keys(productTypeCounts);
    const data = labels.map((type) => productTypeCounts[type]);

    return {
      labels,
      datasets: [
        {
          label: "Tỷ lệ sản phẩm",
          data,
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
          ],
        },
      ],
    };
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={4}>
        {/* Biểu đồ Stacking */}
        <Grid item xs={12} md={6}>
          <Box p={2} boxShadow={2} borderRadius={2}>
            <Typography variant="h6" gutterBottom>
              Số lượng đơn hàng theo thời gian
            </Typography>
            <Bar data={processOrderData()} options={{ responsive: true }} />
          </Box>
        </Grid>

        {/* Biểu đồ tròn */}
        <Grid item xs={12} md={6}>
          <Box p={2} boxShadow={2} borderRadius={2}>
            <Typography variant="h6" gutterBottom>
              Tỷ lệ các loại sản phẩm
            </Typography>
            <Pie data={processProductData()} options={{ responsive: true }} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
