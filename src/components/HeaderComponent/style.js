import { Row } from "antd";
import styled from "styled-components";

export const WrappeHeader = styled(Row)`
  ${"" /* background: rgb(255, 186, 0); */}
  padding: 30px 120px;
  align-items: center;
  gap: 16px;
  flex-wrap: nowrap;
`;

export const WrapperTextHeader = styled.span`
  cursor: pointer;
  font-size: 18px;
  color: red;
  font-wejght: bold;
`;
export const WrapperIconAccount = styled.div`
  display: flex;
  ${"" /* gap: 20px; */}
`;

export const WrapperIconCart = styled.div`
  display: flex;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
  ${"" /* margin-right: 20px; */}
  ${"" /* gap: 20px; */}
`;

export const WrapperHeaderAccount = styled.div`
  display: flex;
  align-items: center;
  ${"" /* margin-right: 20px; */}
`;

export const WrapperListPostsIcon = styled.div`
  display: flex;
  align-items: center;
  ${"" /* margin-right: 30px; */}
`;

export const WrapperTextHeaderSmall = styled.div`
  white-space: nowrap;
`;

export const WrapperContent = styled.p`
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0; /* Màu nền khi hover */
    cursor: pointer;
  }
`;

// Wrapper để chứa logo với bo góc
export const WrapperImage = styled.div`
  width: 100%; // Đảm bảo phần tử chiếm toàn bộ không gian trong Col
  height: 100%; // Đảm bảo phần tử chiếm toàn bộ chiều cao của Col
  border-radius: 15px; // Bo góc hình ảnh
  overflow: hidden; // Ẩn phần thừa ngoài viền bo góc
`;

export const LogoImage = styled.img`
  width: 100%; // Làm cho ảnh chiếm toàn bộ chiều rộng của Wrapper
  height: 100%; // Làm cho ảnh chiếm toàn bộ chiều cao của Wrapper
  object-fit: cover; // Đảm bảo ảnh không bị méo và vẫn giữ tỷ lệ
`;

export const LogoWrapper = styled.div`
  width: 120px; // Đặt chiều rộng cố định cho logo (bạn có thể điều chỉnh kích thước này)
  height: 70px; // Đặt chiều cao cố định cho logo (bạn có thể điều chỉnh kích thước này)
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;
