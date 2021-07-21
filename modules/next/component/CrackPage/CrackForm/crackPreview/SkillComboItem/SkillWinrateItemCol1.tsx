import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import * as React from "react";

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
`;
const SkillIcon = styled.img`
  border-radius: 1px;
  width: 32px;
`;
const Text = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 100%;
  /* identical to box height, or 14px */

  color: #ffffff;
`;
export default function SkillWinrateItemCol1({ id, winrate }) {
  const router = useRouter();
  useEffect(() => {}, []);
  return (
    <Wrapper>
      <SkillIcon src={`/ability/${id}.png`} />
      <Text>{(winrate || 0.0).toFixed(2)}</Text>
    </Wrapper>
  );
}
