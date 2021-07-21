import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import * as React from "react";
import Divider from "@/component/util/divider";
import NavLink from "@/component/Header/NavLink";

const Wrapper = styled.div`
  height: 80px;
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
  }
`;

const Title = styled.a`
  font-style: normal;
  font-weight: bold;
  font-size: 30px;
  line-height: 100%;
  color: #2cb3ff;
  :hover {
    text-decoration: none;
    color: #2cb3ff;
  }
  margin-left: 130px;
  margin-right: 100px;
`;
const NavLinkDirect = styled.a`
  cursor: pointer;
  font-weight: bold;
  :hover {
    text-decoration: underline;
  }
  font-size: 18px;
  line-height: 100%;
  color: #646c7a;
  white-space: nowrap;
`;

export default function Header({}) {
  const router = useRouter();
  useEffect(() => {
    return () => {};
  });
  return (
    <Wrapper>
      <Divider width={"16px"} />
      <Title href={"/"}>{process.env.NEXT_PUBLIC_SITE_NAME}</Title>
      <NavLinkDirect href={"/"}>首页</NavLinkDirect>
      <Divider width={"20px"} />
      <NavLink
        text={"技能"}
        items={[
          { link: "/skill", name: "技能胜率" },
          { link: "/combo", name: "组合胜率" },
          { link: "/synergy", name: "协作" },
        ]}
      />
      <Divider width={"20px"} />
      <NavLink
        text={"英雄"}
        items={[
          { link: "/hero", name: "英雄胜率" },
          { link: "/heroskill/winrate", name: "英雄技能胜率" },
          { link: "/heroskill/synergy", name: "英雄技能协作" },
        ]}
      />
      <Divider width={"20px"} />
      <NavLinkDirect href={"/crack"}>识图</NavLinkDirect>
    </Wrapper>
  );
}
