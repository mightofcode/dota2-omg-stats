import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import * as React from "react";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  @media screen and (max-width: 865px) {
  }
  > :not(:first-child) {
  }
`;

const ImgItem = styled.img`
  border-radius: 2px;
  width: 48px;
`;
const TextItem = styled.div`
  font-size: 12px;
  line-height: 100%;
  /* identical to box height, or 12px */

  color: #646c7a;
`;
export default function WinrateItem({}) {
  const router = useRouter();
  useEffect(() => {}, []);
  return (
    <Wrapper>
      <ImgItem src={"/earthshaker_enchant_totem 25.png"} />
      <TextItem>50.00%</TextItem>
    </Wrapper>
  );
}
