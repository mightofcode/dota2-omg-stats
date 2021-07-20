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

export default function SkillWinrateItemCol3({ winrate, synergy }) {
  const router = useRouter();
  useEffect(() => {}, []);
  return (
    <Wrapper>
      <Item1>{(winrate || 0.0).toFixed(2)}</Item1>
      <Item2>+{(synergy || 0.0).toFixed(2)}</Item2>
    </Wrapper>
  );
}
