import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import * as React from "react";
import HeroComboItem from "@/component/CrackPage/HeroCombo/HeroComboItem";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  justify-content: flex-start;
  @media screen and (max-width: 865px) {
  }
  > :not(:first-child) {
  }
  > :not(:last-child) {
    margin-right: 30px;
  }
`;

const Item = styled.div``;

export default function HeroCombo({}) {
  const router = useRouter();
  useEffect(() => {}, []);
  return (
    <Wrapper>
      <HeroComboItem />
      <HeroComboItem />
      <HeroComboItem />
    </Wrapper>
  );
}
