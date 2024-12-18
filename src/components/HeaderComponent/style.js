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
