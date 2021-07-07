import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import * as React from "react";
import WinrateItem from "@/component/IndexPage/WinrateItem";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  @media screen and (max-width: 865px) {
  }
  > :not(:first-child) {
  }
  flex-wrap: wrap;
`;

const Item = styled.div``;

export default function WinrateLine({ winrates }) {
  const router = useRouter();

  useEffect(() => {}, []);
  return (
    <Wrapper>
      {(winrates || []).map((item) => (
        <WinrateItem winrate={item} />
      ))}
    </Wrapper>
  );
}
