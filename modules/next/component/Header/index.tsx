import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import * as React from "react";
import Divider from "@/component/util/divider";
import NavLink from "@/component/Header/NavLink";

const Wrapper = styled.div`
  height: 50px;
  background-color: #ffffff;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  @media screen and (max-width: 865px) {
  }
  > :not(:first-child) {
    margin-left: 20px;
  }
`;

const Title = styled.a`
  font-style: normal;
  font-weight: bold;
  font-size: 26px;
  line-height: 100%;
  color: #2cb3ff;
  :hover {
    text-decoration: none;
    color: #2cb3ff;
  }
`;
const NavLinkDirect = styled.a`
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
  font-size: 18px;
  line-height: 100%;
  color: #646c7a;
`;

export default function Header({}) {
  const router = useRouter();
  useEffect(() => {
    return () => {};
  });
  return (
    <Wrapper>
      <Divider width={"16px"} />
      <Title href={"/"}>LoveOMG</Title>
      <NavLinkDirect href={"/"}>首页</NavLinkDirect>
      <NavLink
        text={"技能"}
        items={[
          { link: "/skill", name: "技能胜率" },
          { link: "/combo", name: "组合胜率" },
          { link: "/synergy", name: "协作" },
        ]}
      />
      <NavLink text={"英雄"} items={[{ link: "/hero", name: "英雄胜率" }]} />
      <NavLinkDirect href={"/stats"}>统计</NavLinkDirect>
    </Wrapper>
  );
}
