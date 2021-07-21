import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import * as React from "react";
import SkillWinrateItemCol1 from "@/component/CrackPage/CrackForm/crackPreview/SkillComboItem/SkillWinrateItemCol1";
import SkillWinrateItemCol3 from "@/component/CrackPage/CrackForm/crackPreview/SkillComboItem/SkillWinrateItemCol3";

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

export default function SkillComboItem({ combo }) {
  const router = useRouter();
  useEffect(() => {}, []);

  return (
    <Wrapper>
      <SkillWinrateItemCol1 id={combo?.id1} winrate={combo.winrate1} />
      <SkillWinrateItemCol1 id={combo?.id2} winrate={combo.winrate2} />
      <SkillWinrateItemCol3 winrate={combo?.winrate} synergy={combo?.synergy} />
    </Wrapper>
  );
}
