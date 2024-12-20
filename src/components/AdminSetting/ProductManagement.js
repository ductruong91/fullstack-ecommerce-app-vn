import React, { useEffect, useRef, useState } from "react";
import { Button, Image, Input, Space, Table } from "antd";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import * as AdminService from "../../service/AdminService";
import { useQuery } from "@tanstack/react-query";
import UserDetailForm from "./UserDetailFormComponent/UserDetailForm";
import { success } from "../Message/Message";
import DeleteUserForm from "../DeleteUserFormComponent/DeleteUserForm";
import Highlighter from "react-highlight-words";
import ProductDetailForm from "./ProductDetailForm/ProductDetailForm";

const ProductManagement = () => {
  const user = useSelector((state) => state.user); // Lấy thông tin người dùng từ Redux store
  console.log("acesstoken:", user.access_token);
  const [selectedProduct, setSelectedProduct] = useState(""); // Lưu trữ người dùng được chọn để xem chi tiết
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false); // Quản lý modal xác nhận xóa
  const [productToDelete, setProductToDelete] = useState(null); // Lưu thông tin người dùng cần xóa
  const [data, setData] = useState([]); // Dữ liệu san pham lưu trữ trong state

  //xu li get all User ra ngoai
  const fetchUserAll = async () => {
    const res = await AdminService.getAllProductForAdmin();
    console.log("res", res.data);
    setData(res.data.reverse());
    return res.data;
  };

  const { data: AllProduct, isLoading } = useQuery({
    queryKey: ["users"], // Tên query key
    queryFn: fetchUserAll, // Hàm fetch API
    retry: 3,
    retryDelay: 1000,
  });
  console.log("data sau khi lay", AllProduct);

  //các thành phần liên quan đến getSearchcolum

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
    // handleSearch('', )
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) => {
      // Lấy giá trị của cột theo dataIndex
      const recordValue = record[dataIndex];

      // Kiểm tra nếu recordValue là hợp lệ và có thể chuyển thành chuỗi
      return (
        recordValue &&
        recordValue.toString().toLowerCase().includes(value.toLowerCase())
      );
    },
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    // render: (text) =>
    //   searchedColumn === dataIndex ? (
    //     <Highlighter
    //       highlightStyle={{
    //         backgroundColor: "#ffc069",
    //         padding: 0,
    //       }}
    //       searchWords={[searchText]}
    //       autoEscape
    //       textToHighlight={text ? text.toString() : ""}
    //     />
    //   ) : (
    //     text
    //   ),
  });

  // Các cột của bảng
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
      sorter: (a, b) => {
        const nameA = a.name ?? ""; // tranh th cos may dua moi tao tk, chua co ten
        const nameB = b.name ?? "";
        return nameA.length - nameB.length;
      },
      render: (text) => <a>{text}</a>,
    },

    {
      title: "Hình Ảnh",
      dataIndex: ["images", 0], // Lấy ảnh sản phẩm đầu tiên
      key: "images",
      render: (url) =>
        url ? (
          <Image
            src={url}
            alt="product"
            width={50}
            height={50}
            style={{ objectFit: "cover", borderRadius: "4px" }}
          />
        ) : (
          "N/A"
        ),
    },

    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      sorter: (a, b) => {
        const typeA = a.type ?? ""; // tranh th cos may dua moi tao tk, chua co ten
        const typeB = b.type ?? "";
        return typeA.length - typeB.length;
      },
      ...getColumnSearchProps("type"),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
    },

    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      sorter: (a, b) => a.stock - b.stock,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() => handleView(record)} // Xem thông tin người dùng
            style={{ color: "blue" }}
          >
            View
          </a>
          <a onClick={() => handleDelete(record)} style={{ color: "red" }}>
            <DeleteOutlined /> Delete
          </a>
        </Space>
      ),
    },
  ];

  // Dữ liệu để in ra tất cả người
  // setData(AllUsers);
  //  const data = AllUsers;

  // Hàm xử lý xóa người dùng
  const handleDelete = (product) => {
    console.log("id nguoi can xoa", product._id);
    setProductToDelete(product);
    setIsDeleteModalVisible(true); // Hiển thị modal xác nhận
  };

  // Xử lý xác nhận xóa trong component DeleteUserForm
  const confirmDelete = async () => {
    setIsDeleteModalVisible(false); // Ẩn modal
    // Logic xóa người dùng (thực hiện API xóa ở đây)

    try {
      await AdminService.deleteProduct(productToDelete._id, user.access_token);

      setData((prevData) => prevData.filter((item) => item._id !== user._id));

      success(); // Hiển thị thông báo thành công
    } catch (error) {
      error(); // Hiển thị thông báo lỗi
    }
  };

  // Xử lý hủy bỏ xóa
  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false); // Đóng modal khi người dùng hủy
  };

  // Hàm xử lý xem thông tin người dùng
  const handleView = (product) => {
    console.log("product infor", product);

    setSelectedProduct(product); // Lưu trữ thông tin người dùng được chọn để hiển thị
    console.log("selectedproduct:", selectedProduct);
  };

  // useEffect để theo dõi sự thay đổi của selectedproduct
  useEffect(() => {
    if (selectedProduct) {
      console.log("Selected user has been updated:", selectedProduct);
    }
  }, [selectedProduct]); // Theo dõi khi selectedProduct thay đổi

  return (
    <div style={{ padding: "20px" }}>
      <h2>các sản phẩm được người dùng đăng bán</h2>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="key" // Đảm bảo mỗi dòng có khóa duy nhất
        pagination={true} // Tắt phân trang nếu bạn muốn hiển thị tất cả
      />
      {/* Hiển thị modal xác nhận xóa người dùng */}
      <DeleteUserForm
        visible={isDeleteModalVisible}
        product={productToDelete}
        onConfirmDelete={confirmDelete}
        onCancel={handleCancelDelete}
      />

      {/* Hiển thị modal hoặc form chi tiết khi chọn một product */}
      {selectedProduct && (
        <ProductDetailForm
          product={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          reqUser={user}
        />
      )}
    </div>
  );
};

export default ProductManagement;
