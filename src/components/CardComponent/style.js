import { Card } from "antd";
import styled from "styled-components";


export const WrapperCardStyle = styled(Card)`
${'' /* display: flex; */}
width: 200px;
& img {
  height:167px;
  width: 167px;
}

`
export const StyleNameProduct = styled.div`
  color: #222;
  font-family: Helvetica;
  font-size: 14px;
  line-height: 20.02px;
  margin: 8px 0px 0px;
`;

export const WrapperPriceText = styled.div`
  color: #d0021b;
  ${'' /* display: inline-block; */}
  font-size: 15px;
  font-weight: 700;
  line-height: 19.95px;
  margin: 2px 4px 0px 0px;
  ${'' /* line-height: 18.4px; */}
  padding: 0px 0px 8px;
`;

export const WrapperTimePostText = styled.div`
  color: #9b9b9b;
  display: flex;
  font-size: 10px;
  line-height: 11.5px;
  margin: 0px 3px;
  text-transform: capitalize;
`;
