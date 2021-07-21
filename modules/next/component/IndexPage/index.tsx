import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import * as React from "react";
import WinrateLine from "@/component/IndexPage/WinrateLine";
import Divider from "@/component/util/divider";
import dayjs from "dayjs";

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

const Item = styled.div``;
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
const TextBold = styled.span`
  font-weight: bold;
  font-size: 16px;
  line-height: 150%;
  color: #484848;
`;
const TextLight = styled.span`
  font-size: 16px;
  color: #8b8b8b;
  line-height: 150%;
`;
export default function IndexPage({ heroWinrates, abilityWinrates, stats }) {
  const router = useRouter();

  useEffect(() => {}, []);

  const startDate = new Date(stats?.first?.match_time * 1000);
  const endDate = new Date(stats?.last?.match_time * 1000);

  const showAbility = (abilityWinrates || []).slice(0, 50);

  const showHero = (heroWinrates || []).slice(0, 20);
  return (
    <Wrapper>
      <Title>统计</Title>
      <Item>
        总场次<TextBold>{stats?.count}</TextBold>场
        <TextLight>
          （{dayjs(startDate).format("YYYY-MM-DD hh-mm")} 至{" "}
          {dayjs(endDate).format("YYYY-MM-DD hh-mm")}）
        </TextLight>
      </Item>
      <Item>
        本站统计最近<TextBold>十五天</TextBold>的数据
      </Item>
      <Item>
        最近更新时间：
        <TextBold>
          {dayjs(+stats?.statsUpdate || 0).format("YYYY-MM-DD hh-mm")}
        </TextBold>
      </Item>
      <Divider height={"30px"} />
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
