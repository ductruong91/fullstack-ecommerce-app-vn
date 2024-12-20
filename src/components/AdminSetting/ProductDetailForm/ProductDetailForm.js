import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Avatar, Space, Spin } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import * as UserService from "../../../service/UserService";

const ProductDetailForm = ({ product, setSelectedProduct, reqUser }) => {
  const { name, type, description, price, stock, address, images, userId } =
    product;
  const [currentIndex, setCurrentIndex] = useState(0); // Để điều chỉnh vị trí ảnh hiện tại
  const imagesRender = images ? images : []; // Mảng ảnh, nếu không có thì sử dụng mảng rỗng
  const maxImagesToShow = 3; // Số lượng ảnh tối đa hiển thị
  const [owner, setOwner] = useState(null); // Thông tin người chủ sở hữu
  const [isLoading, setIsLoading] = useState(true); // Trạng thái loading của chủ sở hữu

  // Tìm thông tin người dùng dựa trên userId
  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        try {
          setIsLoading(true); // Bắt đầu tải dữ liệu
          const ownerData = await UserService.getDetailUser(
            userId,
            reqUser.access_token
          ); // Lấy thông tin chủ sở hữu
          setOwner(ownerData.data); // Lưu thông tin chủ sở hữu vào state
        } catch (error) {
          console.error("Error fetching owner:", error);
        } finally {
          setIsLoading(false); // Kết thúc trạng thái loading
        }
      }
    };

    fetchUserData(); // Gọi hàm async
  }, [userId, reqUser]);

  const handleCancel = () => {
    setSelectedProduct(null); // Đóng form khi nhấn hủy
  };

  // Hàm di chuyển ảnh khi click "Xem thêm"
  const handleNextImage = () => {
    if (currentIndex + maxImagesToShow < images.length) {
      setCurrentIndex(currentIndex + maxImagesToShow);
    }
  };

  // Hàm quay lại ảnh trước
  const handlePrevImage = () => {
    if (currentIndex - maxImagesToShow >= 0) {
      setCurrentIndex(currentIndex - maxImagesToShow);
    }
  };

  return (
    <Modal
      title="Product Information"
      visible={true}
      onCancel={handleCancel}
      footer={null} // Không có footer để thêm nút hủy và lưu
      width={500}
    >
      {!isLoading ? (
        <Form layout="vertical">
          {/* Avatar and Name */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Avatar
              size={64}
              src={imagesRender.length > 0 ? imagesRender[0] : undefined}
              style={{ borderRadius: "8px" }}
            />
            <div style={{ marginLeft: "20px" }}>
              <h2 style={{ fontWeight: "bold", marginTop: "10px" }}>{name}</h2>
            </div>
          </div>

          {/* Hiển thị thông tin chủ sở hữu */}
          {owner && (
            <div
              style={{
                marginTop: "10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <strong>Owner: </strong>
              <Avatar
                size={32}
                src={owner.avatar}
                style={{ marginLeft: "10px" }}
              />
              <span style={{ marginLeft: "10px" }}>{owner.name}</span>
            </div>
          )}

          {/* Danh sách ảnh sản phẩm */}
          <div style={{ marginTop: "20px" }}>
            <strong>Images:</strong>
            <div style={{ display: "flex", marginTop: "10px" }}>
              {imagesRender
                .slice(currentIndex, currentIndex + maxImagesToShow)
                .map((img, index) => (
                  <div
                    key={index}
                    style={{
                      marginRight: "10px",
                      borderRadius: "8px",
                      overflow: "hidden",
                      width: "80px",
                      height: "80px",
                    }}
                  >
                    <img
                      src={img}
                      alt={`Product ${index}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover", // Đảm bảo ảnh không bị biến dạng
                      }}
                    />
                  </div>
                ))}
            </div>
            {/* Nếu có nhiều ảnh, hiển thị nút "Xem thêm" */}
            {imagesRender.length > maxImagesToShow && (
              <Space style={{ marginTop: "10px" }}>
                {currentIndex > 0 && (
                  <Button
                    icon={<LeftOutlined />}
                    size="small"
                    onClick={handlePrevImage}
                  >
                    Prev
                  </Button>
                )}
                {currentIndex + maxImagesToShow < imagesRender.length && (
                  <Button size="small" onClick={handleNextImage}>
                    Next
                  </Button>
                )}
              </Space>
            )}
          </div>

          {/* Các thông tin khác */}
          <div>
            <strong>Type:</strong> <p>{type}</p>
          </div>
          <div>
            <strong>Description:</strong> <p>{description}</p>
          </div>
          <div>
            <strong>Price:</strong> <p>${price}</p>
          </div>
          <div>
            <strong>Stock:</strong> <p>{stock}</p>
          </div>
          <div>
            <strong>Address:</strong> <p>{address}</p>
          </div>

          {/* Close button */}
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Button onClick={handleCancel} type="primary">
              Close
            </Button>
          </div>
        </Form>
      ) : (
        <div style={{ marginTop: "20px" }}>
          <strong>Owner:</strong>
          <Spin style={{ marginLeft: "10px" }} />{" "}
          {/* Vòng quay loading khi đang tải */}
        </div>
      )}
    </Modal>
  );
};

export default ProductDetailForm;
