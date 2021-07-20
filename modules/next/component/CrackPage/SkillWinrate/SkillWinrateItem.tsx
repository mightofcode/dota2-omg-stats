import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import * as React from "react";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  @media screen and (max-width: 865px) {
  }
  > :not(:first-child) {
    margin-left: 5px;
  }
`;

const Text = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 100%;
  /* identical to box height, or 18px */

  color: #484848;
`;
const SkillIcon = styled.img`
  border-radius: 2px;
  width: 64px;
`;

export default function SkillWinrateItem({ ability }) {
  const router = useRouter();
  useEffect(() => {}, []);
  return (
    <Wrapper>
      <SkillIcon src={`/ability/${ability?.id}.png`} />
      <Text>{(ability?.winrate || 0.0).toFixed(2)}</Text>
    </Wrapper>
  );
}
