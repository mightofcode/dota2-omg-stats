import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import * as React from "react";
import WinrateLine from "@/component/IndexPage/WinrateLine";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  @media screen and (max-width: 865px) {
  }
  > :not(:first-child) {
    margin-top: 10px;
  }
  width: 100%;
  padding: 46px 131px;
`;

const Item = styled.div`
  flex: 1 1 100px;
`;
const Title = styled.div`
  font-weight: bold;
  font-size: 24px;
  line-height: 150%;
  color: #484848;
`;

export default function IndexPage({ heroWinrates, abilityWinrates }) {
  const router = useRouter();

  useEffect(() => {}, []);

  return (
    <Wrapper>
      <Title>技能</Title>
      <WinrateLine winrates={abilityWinrates} isHero={false}></WinrateLine>
      <Title>英雄</Title>
      <WinrateLine winrates={heroWinrates} isHero={true}></WinrateLine>
    </Wrapper>
  );
}
