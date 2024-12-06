import { Col } from "antd";
import styled from "styled-components";

export const WrapperProduct = styled(Col)`
  display: flex;
  justifycontent: center;
  gap: 15px;
  ${'' /* margin-top: 20px; */}
  flex-wrap: wrap;
`;

export const WrapperNavbar = styled(Col)`
borderRadius: 6px;
height: fit-content;
`