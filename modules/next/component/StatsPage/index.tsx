import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import * as React from "react";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  @media screen and (max-width: 865px) {
  }
  > :not(:first-child) {
  }
  width: 100%;
  padding: 46px 131px;
`;

const Item = styled.div`
  font-size: 16px;
  line-height: 150%;
  color: #484848;
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
const Title = styled.div`
  font-weight: bold;
  font-size: 24px;
  line-height: 150%;
  color: #484848;
  margin-bottom: 20px;
`;

export default function StatsPage({}) {
  const router = useRouter();
  useEffect(() => {}, []);
  return (
    <Wrapper>
      <Title>统计</Title>
      <Item>
        总场次<TextBold>12100</TextBold>场
        <TextLight>（2021-01-01至2022-02-02）</TextLight>
      </Item>
      <Item>
        本站统计最近<TextBold>十天</TextBold>的数据
      </Item>
      <Item>
        最近更新时间：<TextBold>2021-01-01</TextBold>
      </Item>
    </Wrapper>
  );
}
