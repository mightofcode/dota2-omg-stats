import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

const Wrapper = styled.div<{ x; y }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  @media screen and (max-width: 865px) {
  }
  > :not(:first-child) {
  }
  ${(props) =>
    props.x &&
    `
      left: ${props.x - 20}px;
  `}
  ${(props) =>
    props.y &&
    `
      top: ${props.y}px;
  `}
  position: absolute;
`;

const Item = styled.div<{ color }>`
  font-weight: bold;
  font-size: 14px;
  line-height: 100%;
  color: #000000;
  ${(props) =>
    props.color &&
    `
      color: ${props.color};
  `}
`;

export default function CrackItem({ item }) {
  const router = useRouter();

  const num = Math.floor((item.winrate || 0.0).toFixed(2) * 100);
  //
  useEffect(() => {
    //console.log("loaded",item);
  });
  //
  return (
    <Wrapper x={item.x} y={item.y}>
      <Item color={item.color}>
        {item.name_cn}
        {num}
      </Item>
    </Wrapper>
  );
}
