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

  // Dữ liệu cho biểu đồ stacking theo ngày
  const processOrderDataDaily = () => {
    const dailyData = {}; // { "2024-12-21": { completed: 5, pending: 10 } }

    orderData.forEach((order) => {
      const createdAt = new Date(order.createdAt);
      const day = `${createdAt.getFullYear()}-${(createdAt.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${createdAt.getDate().toString().padStart(2, "0")}`;

      if (!dailyData[day]) {
        dailyData[day] = { completed: 0, pending: 0 };
      }

      if (order.status === "completed") {
        dailyData[day].completed++;
      } else {
        dailyData[day].pending++;
      }
    });

    const labels = Object.keys(dailyData).sort(); // Các ngày
    const completedData = labels.map((day) => dailyData[day].completed);
    const pendingData = labels.map((day) => dailyData[day].pending);

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

  // Dữ liệu cho biểu đồ cột tỉ lệ hoàn thành, pending và canceled theo loại sản phẩm
  const processCompletionRateByProductType = () => {
    const statusCounts = {}; // { "Type A": { completed: 5, pending: 3, canceled: 2, total: 10 } }
    let totalOrders = 0; // Tổng số đơn hàng toàn hệ thống

    // Đếm số lượng đơn hàng theo trạng thái và theo loại sản phẩm
    orderData.forEach((order) => {
      order.products.forEach((product) => {
        const type = product.type || "Unknown";

        if (!statusCounts[type]) {
          statusCounts[type] = {
            completed: 0,
            pending: 0,
            canceled: 0,
            total: 0,
          };
        }

        statusCounts[type].total++;

        if (order.status === "completed") {
          statusCounts[type].completed++;
        } else if (order.status === "pending") {
          statusCounts[type].pending++;
        } else if (order.status === "cancelled") {
          statusCounts[type].canceled++;
        }

        totalOrders++; // Cộng tổng số đơn hàng
      });
    });

    // Tính tỉ lệ cho mỗi trạng thái
    const labels = Object.keys(statusCounts);
    const completedData = labels.map(
      (type) => (statusCounts[type].completed / statusCounts[type].total) * 100
    );
    const pendingData = labels.map(
      (type) => (statusCounts[type].pending / statusCounts[type].total) * 100
    );
    const canceledData = labels.map(
      (type) => (statusCounts[type].canceled / statusCounts[type].total) * 100
    );

    return {
      labels,
      datasets: [
        {
          label: "Tỉ lệ hoàn thành (%)",
          data: completedData,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
        {
          label: "Tỉ lệ đang xử lý (%)",
          data: pendingData,
          backgroundColor: "rgba(153, 102, 255, 0.6)",
        },
        {
          label: "Tỉ lệ hủy (%)",
          data: canceledData,
          backgroundColor: "rgba(255, 99, 132, 0.6)",
        },
      ],
    };
  };

  // Dữ liệu cho tổng giao dịch theo từng loại sản phẩm
  const processTotalTransactionByProductType = () => {
    const totalTransactions = {}; // { "Type A": 1000, "Type B": 500 }

    orderData.forEach((order) => {
      order.products.forEach((product) => {
        const type = product.type || "Unknown";
        const totalPrice = order.totalPrice || 0; // Giả sử order có trường totalPrice

        // if (type === "Unknown") {
        //   console.log("order lỗi:", order);
        // }

        if (!totalTransactions[type]) {
          totalTransactions[type] = 0;
        }

        totalTransactions[type] += totalPrice;
      });
    });

    const labels = Object.keys(totalTransactions);
    const data = labels.map((type) => totalTransactions[type]);

    return {
      labels,
      datasets: [
        {
          label: "Tổng giao dịch (VND)",
          data,
          backgroundColor: "rgba(153, 102, 255, 0.6)",
        },
      ],
    };
  };

  // Tính tổng giao dịch (cộng tổng giá trị của tất cả đơn hàng hoàn thành)
  const totalTransactions = orderData.reduce((sum, order) => {
    if (order.status === "completed") {
      sum += order.totalPrice || 0; // Giả sử order có trường totalPrice
    }
    return sum;
  }, 0);

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
            <Bar
              data={processOrderDataDaily()}
              options={{ responsive: true }}
            />
          </Box>
        </Grid>

        {/* Biểu đồ cột tỉ lệ hoàn thành, pending và canceled theo loại sản phẩm */}
        <Grid item xs={12} md={6}>
          <Box p={2} boxShadow={2} borderRadius={2}>
            <Typography variant="h6" gutterBottom>
              Tỉ lệ hoàn thành, đang xử lý và hủy theo loại sản phẩm
            </Typography>
            <Bar
              data={processCompletionRateByProductType()}
              options={{ responsive: true }}
            />
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

        {/* Biểu đồ tổng giao dịch theo loại sản phẩm */}
        <Grid item xs={12} md={6}>
          <Box p={2} boxShadow={2} borderRadius={2}>
            <Typography variant="h6" gutterBottom>
              Tổng giao dịch theo loại sản phẩm
            </Typography>
            <Bar
              data={processTotalTransactionByProductType()}
              options={{ responsive: true }}
            />
          </Box>
        </Grid>

        {/* Tổng giao dịch */}
        <Grid item xs={12}>
          <Box p={2} boxShadow={2} borderRadius={2}>
            <Typography variant="h6" gutterBottom>
              Tổng giao dịch hoàn thành (VND)
            </Typography>
            <Typography variant="h5">
              {totalTransactions.toLocaleString()} VND
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
