import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import * as React from "react";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  @media screen and (max-width: 865px) {
  }
  > :not(:first-child) {
  }
`;

const Item = styled.div`
  flex: 1 1 100px;
`;

export default function IndexPage({ posts, tabs, tab, hotPosts }) {
  const router = useRouter();

  useEffect(() => {
    console.log(posts, tabs, tab, hotPosts);
  }, []);

  return <Wrapper>hello world</Wrapper>;
}
