import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import * as React from "react";
import SkillWinrateItemCol1 from "@/component/CrackPage/SkillCombo/SkillWinrateItemCol1";
import SkillWinrateItemCol3 from "@/component/CrackPage/SkillCombo/SkillWinrateItemCol3";
import HeroWinrateItemCol from "@/component/CrackPage/HeroCombo/HeroWinrateItemCol";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  @media screen and (max-width: 865px) {
  }
  > :not(:first-child) {
  }
  > :not(:last-child) {
    margin-right: 10px;
  }
`;

const Item = styled.div``;

export default function HeroComboItem({}) {
  const router = useRouter();
  useEffect(() => {}, []);
  return (
    <Wrapper>
      <HeroWinrateItemCol />
      <SkillWinrateItemCol1 />
      <SkillWinrateItemCol3 />
    </Wrapper>
  );
}
