import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import * as React from "react";
import Divider from "@/component/util/divider";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  @media screen and (max-width: 865px) {
  }
  > :not(:first-child) {
  }
  height: 100%;
`;
const HeroIcon = styled.img`
  border-radius: 2px;
  width: 80px;
`;
const Item = styled.div``;
const Text = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 100%;
  /* identical to box height, or 14px */

  color: #484848;
`;
export default function HeroWinrateItemCol({ id, winrate }) {
  const router = useRouter();
  useEffect(() => {}, []);
  return (
    <Wrapper>
      <HeroIcon src={`/hero/${id}.png`} />
      <Divider height={"19px"} />
      <Text>{(winrate || 0).toFixed(2)}</Text>
    </Wrapper>
  );
}
