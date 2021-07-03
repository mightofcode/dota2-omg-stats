import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import * as React from "react";
import WinrateItem from "@/component/IndexPage/WinrateItem";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  @media screen and (max-width: 865px) {
  }
  > :not(:first-child) {
    margin-left: 10px;
  }
`;

const Item = styled.div``;

export default function WinrateLine({}) {
  const router = useRouter();
  useEffect(() => {}, []);
  return (
    <Wrapper>
      <WinrateItem />
      <WinrateItem />
      <WinrateItem />
      <WinrateItem />
    </Wrapper>
  );
}
