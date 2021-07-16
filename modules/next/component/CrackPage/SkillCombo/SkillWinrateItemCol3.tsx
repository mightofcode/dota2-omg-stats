import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import * as React from "react";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  @media screen and (max-width: 865px) {
  }
  > :not(:first-child) {
  }
  > :not(:last-child) {
    margin-bottom: 5px;
  }
`;

const Item1 = styled.div`
  font-size: 18px;
  line-height: 100%;
  color: #484848;
`;
const Item2 = styled.div`
  font-size: 14px;
  line-height: 100%;
  color: #484848;
`;

export default function SkillWinrateItemCol3({}) {
  const router = useRouter();
  useEffect(() => {}, []);
  return (
    <Wrapper>
      <Item1>0.50</Item1>
      <Item2>+0.01</Item2>
    </Wrapper>
  );
}
