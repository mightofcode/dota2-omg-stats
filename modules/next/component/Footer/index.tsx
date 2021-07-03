import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import * as React from "react";
import DividerSoft from "@/component/util/DividerSoft";

const Wrapper = styled.div`
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
  width: 100%;
  height: 50px;
  background-color: #ffffff;
  white-space: nowrap;
  padding: 0px 100px;
`;

const TextLeft = styled.p`
  font-size: 16px;
  line-height: 100%;
  color: #646c7a;
`;
const AuthText = styled.a`
  font-size: 16px;
  line-height: 100%;
  color: #484848;
  font-weight: bold;
`;
const LinkText = styled.a``;
export default function Footer({}) {
  const router = useRouter();

  return (
    <Wrapper>
      <TextLeft>
        dota2omg stats site，made by <AuthText>Mocyx</AuthText>
      </TextLeft>
      <DividerSoft width={"90%"} />
      <LinkText>Github</LinkText>
      <LinkText>说明</LinkText>
    </Wrapper>
  );
}
