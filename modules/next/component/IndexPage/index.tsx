import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import * as React from "react";
import WinrateLine from "@/component/IndexPage/WinrateLine";
import Divider from "@/component/util/divider";

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
const Title = styled.a`
  font-weight: bold;
  font-size: 24px;
  line-height: 150%;
  color: #484848;
`;
const Hint = styled.span`
  font-size: 14px;
  line-height: 150%;
  color: #8b8b8b;
`;

export default function IndexPage({ heroWinrates, abilityWinrates }) {
  const router = useRouter();

  useEffect(() => {}, []);

  const showAbility = (abilityWinrates || []).slice(0, 50);

  const showHero = (heroWinrates || []).slice(0, 20);
  return (
    <Wrapper>
      <Title href={"/skill"}>
        技能<Hint>Top50</Hint>
      </Title>
      <WinrateLine winrates={showAbility} isHero={false}></WinrateLine>
      <Divider height={"30px"} />
      <Title href={"/hero"}>
        英雄<Hint>Top20</Hint>
      </Title>
      <WinrateLine winrates={showHero} isHero={true}></WinrateLine>
    </Wrapper>
  );
}
