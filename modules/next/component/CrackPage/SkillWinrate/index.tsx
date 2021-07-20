import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import * as React from "react";
import SkillWinrateItem from "@/component/CrackPage/SkillWinrate/SkillWinrateItem";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  @media screen and (max-width: 865px) {
  }
  > :not(:first-child) {
  }
  > :not(:last-child) {
    margin-right: 10px;
  }
  > * {
    margin-bottom: 10px;
  }
`;

export default function SkillWinrate({ abilities }) {
  const router = useRouter();
  useEffect(() => {}, []);

  return (
    <Wrapper>
      {(abilities || []).map((item) => (
        <SkillWinrateItem ability={item} />
      ))}
    </Wrapper>
  );
}
