import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import * as React from "react";
import SkillWinrate from "@/component/CrackPage/SkillWinrate";
import SkillCombo from "@/component/CrackPage/SkillCombo";
import HeroCombo from "@/component/CrackPage/HeroCombo";
import CrackForm from "@/component/CrackPage/CrackForm";
import Divider from "@/component/util/divider";
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
  width: 100%;
  padding: 46px 131px;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 24px;
  line-height: 150%;
  color: #484848;
  white-space: nowrap;
`;
const SubTitle = styled.div`
  font-weight: bold;
  font-size: 20px;
  line-height: 150%;
  color: #484848;
  white-space: nowrap;
`;

const ResultWrapper = styled.div``;

export default function CrackPage({}) {
  const router = useRouter();

  useEffect(() => {
    //console.log(winrates);
  }, []);

  const [crackResult, setCrackResult] = useState<any>(null);
  //

  const setResult = (d) => {
    console.log(d);
    setCrackResult(d);
  };

  return (
    <Wrapper>
      <Title>识图</Title>
      <Divider height={"30px"} />
      <CrackForm setCrackResult={setResult} />

      {crackResult && (
        <ResultWrapper>
          <SubTitle>技能胜率</SubTitle>
          <Divider height={"10px"} />
          <SkillWinrate abilities={crackResult?.abilities} />

          <Divider height={"30px"} />

          <SubTitle>技能协作</SubTitle>
          <Divider height={"10px"} />
          <SkillCombo combos={crackResult?.combos} />
          <Divider height={"30px"} />
          <SubTitle>英雄技能协作</SubTitle>
          <Divider height={"10px"} />
          <HeroCombo heroCombos={crackResult?.heroCombos} />
          <Divider height={"30px"} />
        </ResultWrapper>
      )}
    </Wrapper>
  );
}
