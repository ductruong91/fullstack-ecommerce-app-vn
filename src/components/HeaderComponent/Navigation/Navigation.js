import React from "react";
import ButtonComponent from "../../ButtonComponent/ButtonComponent";
import { IoIosList } from "react-icons/io";
import { WrapperTypeProduct } from "../../../pages/HomePage/style";
import TypeProduct from "../../TypeProduct/TypeProduct";
import { useDispatch, useSelector } from "react-redux";
import { removeFilter, setFilter } from "../../../redux/slides/filterSlide";
import { Button } from "antd";

const Navigation = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filter.filters);

  const handleTypeFilter = (type) => {
    console.log("filter type truoc thay doi:", filters);

    const existingFilter = filters.find((filter) => filter.key === "type");
    console.log("ton tai filter", existingFilter);

    if (existingFilter?.value === type) {
      dispatch(removeFilter({ key: "type" })); // Bỏ filter nếu đã chọn
    } else {
      dispatch(setFilter({ key: "type", value: type })); // Thêm filter
    }
    console.log("filter type sau thay doi:", filters);
  };

  const arr = [
    "thiết bị học tập chuyên dụng",
    "xe cộ",
    "đồ điện tử",
    "thú cưng",
    "đồ gia dụng",
    "thời trang",
    "khác",
  ];
  return (
    <div style={{ padding: "0 120px" }}>
      <WrapperTypeProduct>
        {/* <ButtonComponent
          size="large"
          icon=<IoIosList />
          styleButton={{
            backgroundColor: "#2bbef9",
            border: "none",
          }}
          bordered="false"
          textButton="danh mục sản phẩm"
        /> */}
        {arr.map((type) => {
          return (
            <Button
              key={type}
              type={
                filters.find(
                  (filter) => filter.key === "type" && filter.value === type
                )
                  ? "primary"
                  : "default"
              }
              onClick={() => handleTypeFilter(type)}
            >
              {type}
            </Button>
          );
        })}
      </WrapperTypeProduct>
    </div>
  );
};

export default Navigation;
