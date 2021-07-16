import { useState, useEffect, useRef } from "react";
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

const Text = styled.a`
  font-weight: bold;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
  font-size: 18px;
  line-height: 100%;
  color: #646c7a;
`;
const Icon = styled.img`
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;

export default function NavLinkTitle({ text, onClick }) {
  const router = useRouter();

  useEffect(() => {}, []);
  return (
    <Wrapper
      onClick={() => {
        onClick();
      }}
    >
      <Text>{text}</Text>
      <Icon src={"/nav-down.svg"} />
    </Wrapper>
  );
}
