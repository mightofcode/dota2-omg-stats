import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import * as React from "react";
import WinrateLine from "@/component/IndexPage/WinrateLine";
import { Table } from "semantic-ui-react";
import CustomTable from "@/component/CustomTable";
import TableHead from "@/component/WinrateTable/TableHead";
import ImgInput from "@/component/form/ImgInput";
import BlackButton from "@/component/buttons/BlackButton";
import SkillWinrate from "@/component/CrackPage/SkillWinrate";
import SkillCombo from "@/component/CrackPage/SkillCombo";
import HeroCombo from "@/component/CrackPage/HeroCombo";
import CrackForm from "@/component/CrackPage/CrackForm";
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

export default function CrackPage({}) {
  const router = useRouter();

  useEffect(() => {
    //console.log(winrates);
  }, []);

  return (
    <Wrapper>
      <Title>识图</Title>
      <CrackForm />
      <SubTitle>技能胜率</SubTitle>
      <SkillWinrate />
      <SubTitle>技能协作</SubTitle>
      <SkillCombo />
      <SubTitle>英雄技能协作</SubTitle>
      <HeroCombo />
    </Wrapper>
  );
}
