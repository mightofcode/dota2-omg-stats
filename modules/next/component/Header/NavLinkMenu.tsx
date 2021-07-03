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
    margin-top: 10px;
  }

  background: #ffffff;
  border-radius: 3px;
  padding: 12px 16px;
  box-shadow: 0px 2px 4px 0px #00000040;
  position: absolute;
  top: 30px;
  left: -20px;
  z-index: 2;
`;

const Item = styled.a`
  white-space: nowrap;
`;

export default function NavLinkMenu({}) {
  const router = useRouter();
  useEffect(() => {}, []);
  return (
    <Wrapper>
      <Item>技能</Item>
      <Item>英雄</Item>
    </Wrapper>
  );
}
