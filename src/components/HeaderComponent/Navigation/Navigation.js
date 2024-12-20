import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFilter, setFilter } from "../../../redux/slides/filterSlide";
import { WrapperTypeProduct } from "../../../pages/HomePage/style";
import TypeButton from "./TypeButton";
import {
  IoIosList,
  IoMdCar,
  IoMdConstruct,
  IoMdPaw,
  IoMdHome,
  IoMdShirt,
  IoMdOptions,
} from "react-icons/io"; // Import các icon
import { LuMonitorSmartphone } from "react-icons/lu";
import { LuSofa } from "react-icons/lu";
import { PiDogBold } from "react-icons/pi";
import { RiShirtLine } from "react-icons/ri";
import { LuRectangleEllipsis } from "react-icons/lu";
import { PiStudentBold } from "react-icons/pi";
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
    { type: "thiết bị học tập chuyên dụng", icon: <PiStudentBold size={40} /> },
    { type: "xe cộ", icon: <IoMdCar size={40} /> },
    { type: "đồ điện tử", icon: <LuMonitorSmartphone size={40} /> },
    { type: "thú cưng", icon: <PiDogBold size={40} /> },
    { type: "đồ gia dụng", icon: <LuSofa size={40} /> },
    { type: "thời trang", icon: <RiShirtLine size={40} /> },
    { type: "khác", icon: <IoMdOptions size={40} /> },
  ];

  return (
    <div
      style={{ padding: "0 120px", display: "flex", justifyContent: "center" }}
    >
      <WrapperTypeProduct
        style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
      >
        {arr.map(({ type, icon }) => {
          const isSelected = filters.find(
            (filter) => filter.key === "type" && filter.value === type
          );
          return (
            <TypeButton
              key={type}
              type={type}
              icon={icon}
              isSelected={!!isSelected}
              onClick={() => handleTypeFilter(type)}
            />
          );
        })}
      </WrapperTypeProduct>
    </div>
  );
};

export default Navigation;
