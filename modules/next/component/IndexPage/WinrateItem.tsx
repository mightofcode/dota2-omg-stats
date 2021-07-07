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
  padding: 0px 5px;
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
export default function WinrateItem({ winrate }) {
  const router = useRouter();
  useEffect(() => {}, []);
  const text = (winrate?.winrate || 0.0).toFixed(2);
  return (
    <Wrapper>
      <ImgItem src={"/earthshaker_enchant_totem_25.png"} />
      <TextItem>{text}</TextItem>
    </Wrapper>
  );
}
