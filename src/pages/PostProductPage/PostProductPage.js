import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Upload,
  message,
  InputNumber,
  Image,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import * as ProductService from "../../service/ProductService";

const { TextArea } = Input;
const { Option } = Select;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const PostProductPage = () => {
  const user = useSelector((state) => state.user);
  console.log("id chủ", user);

  const { name, email, address, phone, avatar } = user;

  // State quản lý thông tin sản phẩm
  const [productData, setProductData] = useState({
    userId: user.id,
    name: "",
    type: "",
    condition: "",
    stock: 0,
    price: 0,
    description: "",
    images: [],
    owner: {
      name: name,
      email: email,
      address: address,
      phone: phone,
      avatar: avatar,
    },
  });
  console.log("chủ", productData.owner);

  // State liên quan đến tải ảnh
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  // const handleChange = ({ fileList: newFileList }) => {
  //   setFileList(newFileList);
  //   const imageUrls = newFileList.map(
  //     (file) => file.url || URL.createObjectURL(file.originFileObj)
  //   );
  //   setProductData({ ...productData, images: imageUrls });
  // };

  const handleChange = async ({ fileList: newFileList }) => {
    // Cập nhật danh sách file
    setFileList(newFileList);

    // Hàm chuyển file sang base64
    const convertToBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result); // Chuỗi base64
        reader.onerror = (error) => reject(error);
      });

    // Lấy danh sách base64 từ danh sách file
    const imagePromises = newFileList.map(async (file) => {
      const fileObj = file.originFileObj || file; // Nếu đã có base64 thì không cần chuyển
      return await convertToBase64(fileObj);
    });

    try {
      const imageBase64List = await Promise.all(imagePromises);
      setProductData({ ...productData, images: imageBase64List });
    } catch (error) {
      console.error("Error converting images to base64:", error);
    }
  };

  const mutation = useMutation({
    mutationFn: (data) => ProductService.createPostProduct(data),
    onSuccess: () => message.success(),
    // onError: () => message.error(),
  });

  const { data, isSuccess } = mutation;

  useEffect(() => {
    if (data?.status === "success") {
      message.success();
    }
  }, [data]);

  const handleSubmit = async () => {
    const { name, type, condition, stock, price, images } = productData;

    if (
      !name ||
      !type ||
      !condition ||
      !stock ||
      !price ||
      images.length === 0
    ) {
      message.error("Vui lòng điền đầy đủ thông tin sản phẩm!");
      return;
    }

    mutation.mutate(productData);
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Tải lên</div>
    </button>
  );

  return (
    <div
      style={{
        maxWidth: "50%",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Tạo sản phẩm bạn muốn pass :)))
      </h1>
      <Form layout="vertical" onFinish={handleSubmit}>
        {/* Upload Hình Ảnh */}
        <Form.Item label="Hình ảnh sản phẩm">
          <Upload
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            beforeUpload={() => false} // Tắt upload tự động
          >
            {fileList.length >= 4 ? null : uploadButton}
          </Upload>
          {previewImage && (
            <Image
              wrapperStyle={{ display: "none" }}
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                afterOpenChange: (visible) => !visible && setPreviewImage(""),
              }}
              src={previewImage}
            />
          )}
        </Form.Item>

        {/* Tên sản phẩm */}
        <Form.Item label="Tên sản phẩm" required>
          <Input
            placeholder="Nhập tên sản phẩm"
            value={productData.name}
            onChange={(e) =>
              setProductData({ ...productData, name: e.target.value })
            }
          />
        </Form.Item>

        {/* Loại sản phẩm */}
        <Form.Item label="Loại sản phẩm" required>
          <Select
            placeholder="Chọn loại sản phẩm"
            value={productData.type}
            onChange={(value) =>
              setProductData({ ...productData, type: value })
            }
          >
            <Option value="thiết bị học tập chuyên dụng">
              thiết bị học tập chuyên dụng
            </Option>
            <Option value="xe cộ">xe cộ</Option>
            <Option value="đồ điện tử">đồ điện tử</Option>
            <Option value="thú cưng">thú cưng</Option>
            <Option value="đồ gia dụng">đồ gia dụng</Option>
            <Option value="thời trang">thời trang</Option>
            <Option value="khác">khác(giải trí, thể thao, sở thích)</Option>
          </Select>
        </Form.Item>

        {/* Tình trạng sản phẩm */}
        <Form.Item label="tình trang hàng của chế">
          <Select
            placeholder="chọn tình trạng"
            value={productData.condition}
            onChange={(value) =>
              setProductData({ ...productData, condition: value })
            }
          >
            <Option value="rất cũ">cũ lắm rồi(dưới 70%)</Option>
            <Option value="cũ">không mới lắm(70%-90%)</Option>
            <Option value="gần như mới">mới(trên90%)</Option>
            <Option value="mới">mới cứng luôn nhé</Option>
          </Select>
        </Form.Item>

        {/* Số lượng */}
        <Form.Item label="Số lượng" required>
          <InputNumber
            min={1}
            placeholder="Nhập số lượng"
            value={productData.stock}
            onChange={(value) =>
              setProductData({ ...productData, stock: value })
            }
            style={{ width: "100%" }}
          />
        </Form.Item>

        {/* Giá */}
        <Form.Item label="Giá sản phẩm (VND)" required>
          <InputNumber
            min={1}
            placeholder="Nhập giá sản phẩm"
            value={productData.price}
            onChange={(value) =>
              setProductData({ ...productData, price: value })
            }
            style={{ width: "100%" }}
          />
        </Form.Item>

        {/* Mô tả sản phẩm */}
        <Form.Item label="Mô tả sản phẩm">
          <TextArea
            rows={4}
            placeholder="Nhập mô tả về sản phẩm"
            value={productData.description}
            onChange={(e) =>
              setProductData({ ...productData, description: e.target.value })
            }
          />
        </Form.Item>

        {/* Nút đăng bán */}
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Đăng bán
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PostProductPage;
