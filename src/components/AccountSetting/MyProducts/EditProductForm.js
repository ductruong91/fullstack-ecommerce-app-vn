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
  Modal,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
// import * as ProductService from "../../service/ProductService";

const { TextArea } = Input;
const { Option } = Select;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const EditProductPage = ({ product, onSave, onDelete, onCancel }) => {
  const [form] = Form.useForm();
  const [productData, setProductData] = useState(product || {});
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  useEffect(() => {
    if (product) {
      setProductData(product);
      const formattedFiles = product.images.map((image, index) => ({
        uid: `${index}`,
        name: `Image ${index + 1}`,
        status: "done",
        url: image,
      }));
      setFileList(formattedFiles);
    }
  }, [product]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    const imageUrls = newFileList.map(
      (file) => file.url || URL.createObjectURL(file.originFileObj)
    );
    setProductData({ ...productData, images: imageUrls });
  };

  const handleSave = async () => {
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

    try {
      await onSave(productData);
      message.success("Lưu thông tin sản phẩm thành công!");
    } catch (error) {
      message.error("Có lỗi xảy ra khi lưu thông tin sản phẩm.");
    }
  };

  const confirmDelete = async () => {
    try {
      await onDelete(productData._id);
      message.success("Xóa sản phẩm thành công!");
      setDeleteModalVisible(false);
      onCancel();
    } catch (error) {
      message.error("Có lỗi xảy ra khi xóa sản phẩm.");
    }
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
    <Modal
      title="Chỉnh sửa sản phẩm"
      visible={!!product}
      onCancel={onCancel}
      footer={null}
    >
      <Form layout="vertical" form={form} onFinish={handleSave}>
        <Form.Item label="Hình ảnh sản phẩm">
          <Upload
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            beforeUpload={() => false}
          >
            {fileList.length >= 8 ? null : uploadButton}
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

        <Form.Item label="Tên sản phẩmmmmm" required>
          <Input
            value={productData.name}
            onChange={(e) =>
              setProductData({ ...productData, name: e.target.value })
            }
          />
        </Form.Item>

        <Form.Item label="Loại sản phẩm" required>
          <Select
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

        <Form.Item label="Tình trạng sản phẩm">
          <Select
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

        <Form.Item label="Số lượng" required>
          <InputNumber
            min={1}
            value={productData.stock}
            onChange={(value) =>
              setProductData({ ...productData, stock: value })
            }
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item label="Giá sản phẩm (VND)" required>
          <InputNumber
            min={1}
            value={productData.price}
            onChange={(value) =>
              setProductData({ ...productData, price: value })
            }
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item label="Mô tả sản phẩm">
          <TextArea
            rows={4}
            value={productData.description}
            onChange={(e) =>
              setProductData({ ...productData, description: e.target.value })
            }
          />
        </Form.Item>

        <div style={{ textAlign: "right" }}>
          <Button type="primary" htmlType="submit" style={{ marginRight: 10 }}>
            Lưu thông tin
          </Button>
          <Button danger onClick={() => setDeleteModalVisible(true)}>
            Xóa sản phẩm
          </Button>
        </div>
      </Form>

      <Modal
        title="Xác nhận xóa sản phẩm"
        visible={deleteModalVisible}
        onOk={confirmDelete}
        onCancel={() => setDeleteModalVisible(false)}
        okText="Đồng ý"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn muốn xóa sản phẩm này?</p>
      </Modal>
    </Modal>
  );
};

export default EditProductPage;
