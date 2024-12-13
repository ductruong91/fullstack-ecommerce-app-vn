import { Col, Image, InputNumber } from "antd";
import styled from "styled-components";

export const WrapperStyleImageSmall = styled(Image)`
  height: 64px;
  width: 64px;
  object-fit: cover;
  border-radius: 5px;
`;

export const WrapperStyleCol = styled(Col)`
  display: flex;
  height: 76px;
  width: 76px;

  flex-basic: unset;
`;

export const WrapperStyleNameProduct = styled.h3`
  margin-top: 0;
  margin-bottom: 8px;
  font-family: Helvetica, Arial, Roboto, sans-serif;
  font-style: normal;
  font-weight: 700;
  line-height: 1.5;
  color: #222;
`;

export const WrapperStyleStock = styled.div`
  font-size: 14px;
  line-height: 24px;
  color: rgb(120, 120, 120);
`;

export const WrapperPrice = styled.div`
  font-size: 18px;
  color: #e5193b;
  line-height: 24px;
  font-weight: 700;
  margin-top: 10px;
`;

export const WrapperLocation = styled.div`
  display: flex;
  margin-top: 10px;
  gap: 10px;
`;
export const WrapperTextLocation = styled.div`
  color: #333;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 14px;
  line-height: 1.42857;
`;

export const WrapperTimePost = styled.div`
  display: flex;
  margin-top: 10px;
  gap: 10px;
`;

export const WrapperTextTimePost = styled.div`
  color: #333;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 14px;
  line-height: 1.42857;
`;

export const WrapperUser = styled.div`
  display: flex;
  border-radius: 8px;
  border: 1px solid #e8e8e8;
  padding: 16px 20px;
  gap: 10px;
  align-items: center;
  margin-top: 20px;
`;

export const WrapperUserImage = styled(Image)`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
`;

export const WrapperUserName = styled.div`
  color: rgb(34, 34, 34);
  cursor: inherit;
  font-size: 14px;
  font-weight: 700;
`;

export const WrapperUserNumberProduct = styled.div`
  color: rgb(34, 34, 34);
  cursor: inherit;
  font-size: 14px;
  font-weight: 700;
`;

export const WrapperQualityNumber = styled.div`
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  margin-top: 20px;
`;

export const WrapperInputNumber = styled(InputNumber)`
  margin-top: 10px;
`;

export const WrapperBuyButton = styled.div`
display: flex;
paddingTop: 20px;
margin-top: 30px;
justifyContent:center;
gap:20px;
`
